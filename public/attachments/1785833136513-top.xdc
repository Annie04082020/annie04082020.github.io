##################################################
# Clock
##################################################
set_property -dict { PACKAGE_PIN L16   IOSTANDARD LVCMOS33 }     [get_ports { sys_clock }];
create_clock -add -name sys_clk_pin -period 8.00 -waveform {0 4} [get_ports { sys_clock }];


##################################################
# HDMI Clock
##################################################
set_property -dict { PACKAGE_PIN H16   IOSTANDARD TMDS_33 }     [get_ports { TMDS_0_clk_p }];
set_property -dict { PACKAGE_PIN H17   IOSTANDARD TMDS_33 }     [get_ports { TMDS_0_clk_n }];


##################################################
# HDMI Data Lane 2
##################################################
set_property -dict { PACKAGE_PIN B19   IOSTANDARD TMDS_33 }     [get_ports { TMDS_0_data_p[2] }];
set_property -dict { PACKAGE_PIN A20   IOSTANDARD TMDS_33 }     [get_ports { TMDS_0_data_n[2] }];


##################################################
# HDMI Data Lane 1
##################################################
set_property -dict { PACKAGE_PIN C20   IOSTANDARD TMDS_33 }     [get_ports { TMDS_0_data_p[1] }];
set_property -dict { PACKAGE_PIN B20   IOSTANDARD TMDS_33 }     [get_ports { TMDS_0_data_n[1] }];


##################################################
# HDMI Data Lane 0
##################################################
set_property -dict { PACKAGE_PIN D19   IOSTANDARD TMDS_33 }     [get_ports { TMDS_0_data_p[0] }];
set_property -dict { PACKAGE_PIN D20   IOSTANDARD TMDS_33 }     [get_ports { TMDS_0_data_n[0] }];

set_property -dict { PACKAGE_PIN Y16   IOSTANDARD LVCMOS33 } [get_ports { reset_rtl }]; 

