# Adding Filter to the Camera

## **How to apply filter On this project:**
## 答案

可以在**Demosaic → Gamma LUT → VDMA**這條AXI4-Stream影像處理鏈中插入新的濾鏡IP。最簡單的方式是**修改既有的Gamma LUT曲線**（軟體端调整，不用碰硬體），或者在block design裡新增一個Xilinx內建的video濾鏡IP（如`v_hscaler`、`v_hdmi_color_space_converter`或最簡單的自訂HLS濾鏡）串接在`v_demosaic_0`與`v_gamma_lut_0`之間。

---

## 詳細建議

### 資料流位置

目前的AXI4-Stream視訊鏈路是：

```
mipi_csi2_rx_subsyst_0 → v_demosaic_0 → v_gamma_lut_0 → axi_vdma_0 (S2MM)
```

對應接線： [1](#88-0) 

新的濾鏡IP應該插在`v_demosaic_0/m_axis_video`與`v_gamma_lut_0/s_axis_video`之間，因為此時資料已經從RAW Bayer轉成RGB，濾鏡在RGB domain操作才有意義。

### 方案一：最簡單——調整Gamma LUT曲線（純軟體）

不用改硬體，直接修改`software/src/gamma_lut.c`裡寫入LUT的常數表，即可達到「顏色濾鏡」效果（例如調對比、飽和度風格）： [2](#88-1) 

這些常數來自`xilinx-gamma-coeff.h`（`xgamma10_07`, `xgamma10_10`等表） [3](#88-2) ，你可以自己算一組新的LUT曲線（例如黑白、懷舊色調）取代現有表格，不需要重新synthesis。

Directly loading different coeffients seems the easiest one. `xilinx-gamma-coeff.h`

### 方案二：插入新的Xilinx video IP（如色彩空間轉換/縮放）

在Vivado block design裡新增IP（例如`v_hscaler`做模糊/縮放效果，或`v_csc`做色彩空間轉換），流程：

1. 在IP Integrator裡新增新IP實例
2. 斷開`v_demosaic_0/m_axis_video → v_gamma_lut_0/s_axis_video`，改成`v_demosaic_0 → 新IP → v_gamma_lut_0`
3. 新IP若有AXI-Lite控制介面，需要接到`ps8_0_axi_periph`並多一個`assign_bd_address`（同你之前處理TPG移除/AXI Interconnect重排的做法 [4](#88-3) ）
4. 軟體端新增對應的`xxx_init()`驅動檔案，模式參考`demosaic.c`/`gamma_lut.c`的寫法 [5](#88-4) 

### 方案三：自己寫HLS濾鏡IP（進階，但你已經踩過Y2K22雷）

用Vitis HLS寫一個C/C++濾鏡（例如簡單的卷積、邊緣偵測），匯出成IP後同方案二插入。但考慮到你之前已經被Y2K22 HLS匯出bug卡過，這個方案風險較高，除非patch已裝好。

## Notes

這個repo本身沒有內建任何「濾鏡」相關程式碼，以上是基於現有pipeline架構（demosaic→gamma_lut→vdma）給出的擴充建議，不是repo既有功能。方案一（改Gamma LUT表）风险最低、最快能驗證效果，因為完全不需要重新走一次你已經吃過苦頭的Vivado synthesis/Y2K22/JTAG流程。

Wiki pages you might want to explore:
- [Video Pipeline Data Flow (gtaylormb/ultra96v2_imx219_to_displayport)](/wiki/gtaylormb/ultra96v2_imx219_to_displayport#2.1)
- [AXI Address Map and IP Core Register Layout (gtaylormb/ultra96v2_imx219_to_displayport)](/wiki/gtaylormb/ultra96v2_imx219_to_displayport#2.3)


## **Using terminal send message to change filter**

## 答案

可行，但這個repo目前**沒有**任何讀取terminal輸入的程式碼——`main.c`裡的流程是單向初始化後就結束（`return 0`），沒有main loop去監聽UART輸入 [1](#90-0) 。你需要自己新增程式碼才能達成這個效果。

---

## 詳細說明

### 目前程式碼結構

`main()`依序呼叫各`_init()`函式後直接印出"Entire video pipeline activated"、呼叫`cleanup_platform()`再`return 0`結束 [1](#90-0) ，並沒有進入一個等待輸入的迴圈。Vitis的Serial Terminal視窗目前只會顯示`xil_printf`印出的log（單向輸出），不會被程式讀取。

### 要怎麼加

1. **在`main()`結尾加一個`while(1)`迴圈**，用`XUartPs_RecvByte`或類似的阻塞式讀取function，等待你在Vitis Serial Terminal輸入字元。
2. **依輸入字元決定行為**：例如輸入`'1'`就重新呼叫`gamma_lut_init()`（可以先改寫`gamma_lut.c`讓它接受不同的LUT曲線參數），輸入`'2'`套用另一組係數，達到「換濾鏡」效果。
3. 因為`gamma_lut_init()`本身是用`XV_gamma_lut_Write_HwReg_gamma_lut_0/1/2_Words`把`software/src/xilinx-gamma-coeff.h`裡的常數表寫入硬體LUT暫存器 [2](#90-1) ，只要你多準備幾組不同的gamma係數表，就能在runtime依輸入切換，不需要重新synthesis硬體。

### 為什麼這是可行且低成本的方案

這跟你之前"沒有實體開關"的討論是同一個思路的延伸——用UART console取代實體按鍵作為輸入介面，而不需要碰觸block design、不需要重新走一次你已經吃過苦頭的Vivado synthesis/JTAG流程，只需要在Application Project裡改`main.c`跟`gamma_lut.c`，重新Build/Run即可生效。

## Notes

這整套「terminal輸入切換濾鏡」的程式碼目前完全不存在於這個repo，是你需要自己撰寫的擴充功能；`main.c`與`gamma_lut.c`只是提供你可以掛入邏輯的既有進入點與硬體介面 [3](#90-2) 。若要接收terminal輸入，建議查閱Xilinx標準函式庫裡`XUartPs`相關的API（非這個repo程式碼範圍），確認你的Platform BSP裡有沒有正確生成對應的UART driver。

Wiki pages you might want to explore:
- [MIPI CSI-2 and Video Processing IP Drivers (gtaylormb/ultra96v2_imx219_to_displayport)](/wiki/gtaylormb/ultra96v2_imx219_to_displayport#4.2)
