`timescale 1ns / 1ps

module color_invert (
    input wire clk,
    input wire rst_n,

    // ==========================================
    // 1. AXI4-Stream Video Slave (輸入影像)
    // ==========================================
    input wire [31:0] s_axis_video_tdata,
    input wire        s_axis_video_tvalid,
    output wire       s_axis_video_tready,
    input wire        s_axis_video_tlast,
    input wire        s_axis_video_tuser,

    // ==========================================
    // 2. AXI4-Stream Video Master (輸出影像)
    // ==========================================
    output reg [31:0] m_axis_video_tdata,
    output reg        m_axis_video_tvalid,
    input wire        m_axis_video_tready,
    output reg        m_axis_video_tlast,
    output reg        m_axis_video_tuser
);

    // ?部暫存器：用來自動切換濾鏡模式 (0~4)
    reg [2:0] ctrl_mode;
    
    // 定時切換計數器 (假設 clk 是 100MHz 或 150MHz 等，可依需求調整大小與目標?)
    // 這裡用 28-bit 計數器大約?隔幾秒鐘切換一次
    reg [27:0] timer_cnt;

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            timer_cnt <= 28'd0;
            ctrl_mode <= 3'd0;
        end else begin
            if (timer_cnt == 28'd100_000_000) begin // 數到指定週期 (例如 1 億個cycle)
                timer_cnt <= 28'd0;
                ctrl_mode <= (ctrl_mode == 3'd4) ? 3'd0 : (ctrl_mode + 1'b1); // 0~4 循環切換
            end else begin
                timer_cnt <= timer_cnt + 1'b1;
            end
        end
    end

    // ==========================================
    // 影像串流處理與 5 種濾鏡邏輯
    // ==========================================
    assign s_axis_video_tready = m_axis_video_tready;

    // 拆解 R, G, B
    wire [7:0] x_in = s_axis_video_tdata[31:24];
    wire [7:0] r_in = s_axis_video_tdata[23:16];
    wire [7:0] g_in = s_axis_video_tdata[15:8];
    wire [7:0] b_in = s_axis_video_tdata[7:0];

    // 1. 二?化
    wire [7:0] gray_val = (77 * r_in + 150 * g_in + 29 * b_in) >> 8;
    wire [31:0] binarized_pixel = (gray_val > 8'd128) ? 32'hFFFFFFFF : 32'h00000000;

    // 2. 顏色反轉
    wire [31:0] reverted_pixel = {8'h00,8'd255 - r_in, 8'd255 - g_in, 8'd255 - b_in};

    // 4. 藍色偵測 (藍色變黑，其他變白)
    wire is_blue = (b_in > 8'd70) && (b_in > (r_in + 8'd30)) && (b_in > (g_in + 8'd30));
    wire [31:0] blue_extracted_pixel = is_blue ? 32'h00000000 : 32'hFFFFFFFF;

    // ==========================================
    // 標準 AXI-Stream 影像處理管線
    // ==========================================
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            m_axis_video_tdata  <= 32'd0;
            m_axis_video_tvalid <= 1'b0;
            m_axis_video_tlast  <= 1'b0;
            m_axis_video_tuser   <= 1'b0;
        end else if (m_axis_video_tready) begin
            m_axis_video_tvalid <= s_axis_video_tvalid;

            if (s_axis_video_tvalid) begin
                case (ctrl_mode)
                    3'd0:    m_axis_video_tdata <= s_axis_video_tdata;      // 0: Original
                    3'd1:    m_axis_video_tdata <= binarized_pixel;         // 1: Binarization
                    3'd2:    m_axis_video_tdata <= reverted_pixel;          // 2: Colour Reversion
                    3'd3:    m_axis_video_tdata <= s_axis_video_tdata;      // 3: 預留
                    3'd4:    m_axis_video_tdata <= blue_extracted_pixel;    // 4: 藍色偵測
                    default: m_axis_video_tdata <= s_axis_video_tdata;
                endcase
            end

            m_axis_video_tlast <= s_axis_video_tlast;
            m_axis_video_tuser <= s_axis_video_tuser;
        end
    end

endmodule