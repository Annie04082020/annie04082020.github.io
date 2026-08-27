# LinkedIn Projects — Annie Huang / 黃安華

---

## 🇺🇸 English Version

---

### UltimateBomb — VHDL Logic Game

**Description:**
A composite bomb-defusal logic game implemented entirely in VHDL on an FPGA board. Features a custom FSM controller, hardware random number generator, countdown timer, dual input modes (BCD/BIN), and dynamic difficulty scaling. Output includes a custom 16-segment display font library and LED progress decoder. Final project for Digital Logic Design Lab.

**Skills:** VHDL · FPGA · Digital Logic Design · FSM Design · Hardware Description Language

---

### Angry Birds Replica — C++ / PTSD Engine

**Description:**
A 1:1 faithful recreation of Angry Birds built from scratch in C++ using the PTSD game engine (NTUT OSC). Implemented projectile physics with drag simulation, five multi-type bird special abilities (Red/Yellow/Blue/Black/White), destructible block materials (Wood/Stone/Ice each with distinct HP and fracture animations), and SDL2_mixer audio integration. Served as Project Manager in a 2-person team. Semester capstone for Object-Oriented Programming Lab (OOPL 2026 Spring).

**Skills:** C++ · Object-Oriented Programming · SDL2 · CMake · Game Development · Physics Simulation · WSL

---

### Performance Analysis of YOLO-Based Models for Contraband Detection on SIXray

**Description:**
Trained and evaluated YOLOv10 nano/small models on the SIXray X-ray contraband dataset (1M+ images, extreme 1:1000 class imbalance). Implemented Class-Balanced Grouping and Mosaic augmentation strategies. Analyzed trade-offs in mAP (up to 0.502), inference latency, and FLOPs under RTX 3080 hardware constraints. Resolved VRAM overflow in larger models via dynamic batch sizing and learning rate scheduling. Compared results against YOLOv4_sr benchmark.

**Skills:** Python · PyTorch · YOLOv10 · Computer Vision · Deep Learning · Data Engineering · GPU Optimization

---

### CSL Ultrasonic Autonomous Car — Discrete H-Bridge Control

**Description:**
Built an autonomous obstacle-tracking vehicle capable of distance maintenance using ultrasonic sensor feedback. The H-Bridge motor driver was hand-constructed entirely from discrete components (BJTs and relays), avoiding pre-made IC modules for deep hardware understanding. Implemented Median Filter noise rejection for sensor stabilization and a Bang-Bang with Deadband control algorithm on Arduino for smooth motor correction and spot turns.

**Skills:** Arduino · Embedded Systems · Analog Circuit Design · Control Systems · Signal Processing · C

---

### Linux Odyssey — Interactive Terminal Teaching Website

**Description:**
Co-founded and developed an open-source interactive Linux learning platform featuring a browser-based terminal simulator. Responsible for Vue frontend development, UI/UX visual design, and Cypress end-to-end test automation. The project has been adopted in collaboration with NTUT GDSC and presented at SITCON 2024 and COSCUP 2024.
🏆 1st Prize — g0v Sch001 2023 Project Incubation Competition
🏆 2nd Place — InnoServe Awards 28th, Titansoft Agile Track

**Skills:** Vue.js · TypeScript · JavaScript · Cypress · Test Automation · UI/UX Design · Open Source

---

### Music Block — MIT City Science Lab UROP

**Description:**
Developed firmware in C for a tangible music-theory teaching device at MIT City Science Lab. The product concept translates physical block configurations into 3D visualized sound and music theory concepts, targeting music beginners. Responsible for firmware development on microcontrollers including serial communication protocols between blocks and the base board, and real-time sound synthesis output.

**Skills:** C · Firmware Development · Embedded Systems · Microcontrollers · Rapid Prototyping · Serial Communication

---

### Behind Brewing — Coffee Maker Thermistor & Heater Circuit Study

**Description:**
Analyzed and simulated the thermal control circuit of commercial drip coffee makers in the Circuit Theory course. Deconstructed the electrical architecture, modeled thermal feedback loops using SIMetrix SPICE simulation software, and recalculated ideal resistor values for precise 92–96°C temperature maintenance. The optimized circuit design achieved a 15% reduction in initial temperature overshoot.

**Skills:** Circuit Theory · SPICE Simulation · SIMetrix · Thermal Control Systems · Analog Electronics

---

### CT to Image Converter — Medical Data Preprocessing (LEDA Technology)

**Description:**
Collaborated with LEDA Technology, NYCU, and CYCU students to build a web platform for fast AI model deployment. Independently wrote Python scripts to batch-convert DICOM (CT scan) files into JPG/PNG image formats for medical data annotation, working directly with doctors to streamline the labeling pipeline.

**Skills:** Python · Medical Imaging · DICOM · Data Preprocessing · Full-Stack Development

---

### P-TECH Call for Code — Pandemic Resource Dispatch System

**Description:**
Designed a two-sided COVID-19 resource routing system during the pandemic. The medical staff side calculates nearest locations with adequate materials and manpower. The public-facing side guides users through quick symptom screening and directs them to appropriate destinations. Submitted as a competition entry for P-TECH Call for Code.

**Skills:** System Design · UI/UX Prototyping · Resource Optimization · Problem Solving

---

---

## 🇹🇼 中文版本

---

### UltimateBomb 終極密碼拆彈遊戲 — VHDL 數位邏輯設計

**說明：**
以 VHDL 在 FPGA 開發板上純硬體實作的複合式邏輯遊戲，結合拆彈與終極密碼玩法。系統分為控制單元（Game Controller FSM + Level Manager）、記憶單元（Min/Max 暫存器）、運算單元（硬體亂數產生器、倒數計時器、密碼比較器），以及輸出單元（自建 16 段顯示器字型庫、LED 進度解碼器）。支援 BCD/BIN 雙輸入模式與四段動態難度縮圈機制。為數位邏輯設計實習之學期末專題。

**相關技能：** VHDL · FPGA · 數位邏輯設計 · FSM 狀態機設計 · 硬體描述語言

---

### Angry Birds 完整復刻版 — C++ / PTSD 遊戲引擎

**說明：**
以 C++ 搭配 PTSD 遊戲框架（北科開源社）1:1 完整復刻 Angry Birds。實作拋體物理運動（含空氣阻力模擬）、五種鳥類特殊技能（紅/黃/藍/黑/白色各具不同能力）、三種材質方塊（木頭/石頭/冰塊，各具不同 HP、質量與破碎動畫），以及 SDL2_mixer + OGG/Vorbis 音效整合。以專案經理（PM）身分與一名組員完成整學期開發。為物件導向程式設計實習（OOPL 2026春）課程成果。

**相關技能：** C++ · 物件導向程式設計 · SDL2 · CMake · 遊戲開發 · 物理模擬 · WSL

---

### 基於 YOLO 模型的 SIXray 違禁物識別性能分析：以 YOLOv10 為例

**說明：**
在 SIXray X 光違禁物資料集（100萬+ 影像，1:1000 嚴重類別不平衡）上訓練並評估 YOLOv10 nano/small 模型。實作類別平衡分組策略（Class-Balanced Grouping）與 Mosaic 資料增強。在 RTX 3080 硬體限制下，分析 mAP（最高達 0.502）、推論延遲與 FLOPs 的效能權衡。透過動態批次大小與學習率排程解決大型模型的 VRAM 溢出問題，並與 YOLOv4_sr 基準進行比較分析。

**相關技能：** Python · PyTorch · YOLOv10 · 電腦視覺 · 深度學習 · 資料工程 · GPU 資源優化

---

### CSL 超音波自律小車 — 離散元件 H 橋馬達控制

**說明：**
搭載超音波感測器的自律行駛避障小車，具備障礙物跟隨與距離保持功能。H 橋馬達驅動器以離散 BJT 電晶體與繼電器手工搭建，捨棄現成驅動模組以深入理解硬體底層運作。實作中值濾波器（Median Filter）排除超音波量測雜訊，並在 Arduino 上開發具備死區控制（Deadband）的 Bang-Bang 演算法，實現平滑修正與現地轉向。

**相關技能：** Arduino · 嵌入式系統 · 類比電路設計 · 控制系統 · 訊號處理 · C 語言

---

### Linux Odyssey — 互動式 Linux 終端機教學網站

**說明：**
共同發起並開發開源互動式 Linux 學習平台，具備瀏覽器端終端機模擬器。負責 Vue 前端開發、UI/UX 視覺設計，以及 Cypress 端對端自動化測試。專案與北科大 GDSC 合作推廣，並於 SITCON 2024 舉辦工作坊、COSCUP 2024 展示成果。
🏆 首獎 — g0v 零時小學校 2023 第四屆專案孵化競賽
🏆 第二名 — 第 28 屆大專校院資訊應用服務創新競賽・鈦坦敏捷開發獎

**相關技能：** Vue.js · TypeScript · JavaScript · Cypress · 測試自動化 · UI/UX 設計 · 開源協作

---

### Music Block — MIT City Science Lab UROP 研究實習

**說明：**
於 MIT 城市科學實驗室（MIT CSL）進行研究實習，以 C 語言開發音樂教學積木裝置的微控制器韌體。產品概念是將音樂轉化為可見的 3D 實體積木，幫助音樂初學者建立樂理與聲音的直覺。負責積木與底板間的序列通訊韌體及即時聲音合成輸出控制。

**相關技能：** C 語言 · 韌體開發 · 嵌入式系統 · 微控制器 · 快速原型開發 · 序列通訊

---

### Behind Brewing — 咖啡機熱敏電阻與加熱器電路研究

**說明：**
於電路學課程中分析並模擬市售美式滴濾咖啡機的溫控電路。拆解電路架構後，使用 SIMetrix SPICE 模擬軟體建立熱回饋迴路模型，重新計算熱敏電阻與加熱器阻值，達成精準的 92-96°C 恆溫控制。優化後的電路設計成功降低 15% 的初始溫度過衝。

**相關技能：** 電路理論 · SPICE 模擬 · SIMetrix · 熱控制系統 · 類比電子學

---

### CT 影像轉檔程式 — 醫療資料前處理（與 LEDA Technology 合作）

**說明：**
與 LEDA Technology、交通大學及中原大學學生合作，開發可快速套用 AI 模型的展示網站。獨立撰寫 Python 腳本，將醫療等級的 DICOM（CT 斷層掃描）影像批次轉換為 JPG/PNG 格式，直接與醫師合作優化資料標記作業流程。

**相關技能：** Python · 醫療影像處理 · DICOM · 資料前處理 · 全端開發

---

### P-TECH Call for Code — 疫情醫療人力物資調度系統

**說明：**
於 COVID-19 疫情期間設計雙端資源調度系統：醫療端計算最近且具備充足物資與人力的地點；民眾端提供快速症狀篩檢引導並指示前往適當目的地。作為 P-TECH Call for Code 競賽之參賽作品。

**相關技能：** 系統設計 · UI/UX 原型設計 · 資源優化 · 問題解決

---
