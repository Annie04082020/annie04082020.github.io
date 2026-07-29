module stopwatch(
    clk,
    s_start, 
    s_clr)
    input s_start;
    input s_clr;
    // output stopwatch data
    output stop_time;

    initial begin
        if(s_clr)
        begin
            if(s_start)
            integer counter;
            begin
                @posedge(clk){
                    counter ++;
                }
            end    
        end
        assign stop_time = counter;
    end
endmodule