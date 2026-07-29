module reg_if(
    i_lsel, 
    i_lwrite, 
    i_laddr, 
    i_lwdata)

reg [31:0]select;
reg [31:0]s_start;
reg [31:0]s_clr;
reg [31:0]t_start;
reg [31:0]t_clr;
reg [31:0]settime;
reg [31:0]set_data;

input i_lsel;
input i_lwrite;
input [3:0]i_laddr;
input [31:0]i_lwdata;

output q_lready;
output [13:0]set_data;
output [31:0]q_lrdata;

output s_start;
output s_clr;
output t_start;
output t_clr;
output [31:0]settime;

initial begin
    select[0]=i_sel;
    if (select[0])begin
        s_start[0]=1'b1;
        s_
    end    
    else begin
    end
    
    
end


endmodule
