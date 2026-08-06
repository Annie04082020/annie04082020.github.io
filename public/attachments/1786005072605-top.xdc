## Zybo (1st Gen.) constraints file
## chapter: 2
## project: HDMI colorbar

#Clock signal
set_property -dict { PACKAGE_PIN L16   IOSTANDARD LVCMOS33 }     [get_ports { sys_clock }];
create_clock -add -name sys_clk_pin -period 8.00 -waveform {0 4} [get_ports { sys_clock }];

#Reset
set_property -dict { PACKAGE_PIN Y16   IOSTANDARD LVCMOS33 } [get_ports { reset_rtl }]; 

##Single LED
set_property -dict { PACKAGE_PIN M14   IOSTANDARD LVCMOS33 } [get_ports {led1_0}];
set_property -dict { PACKAGE_PIN M15   IOSTANDARD LVCMOS33 } [get_ports {led2_0}];
set_property -dict { PACKAGE_PIN G14   IOSTANDARD LVCMOS33 } [get_ports {led3_0}];
set_property -dict { PACKAGE_PIN D18   IOSTANDARD LVCMOS33 } [get_ports {led4_0}];


##Buttons
set_property -dict { PACKAGE_PIN R18   IOSTANDARD LVCMOS33 } [get_ports {spd_up}];
set_property -dict { PACKAGE_PIN P16   IOSTANDARD LVCMOS33 } [get_ports {spd_down}];
#set_property -dict { PACKAGE_PIN V16   IOSTANDARD LVCMOS33 } [get_ports {}];
#set_property -dict { PACKAGE_PIN Y16   IOSTANDARD LVCMOS33 } [get_ports {}];

##HDMI
set_property -dict { PACKAGE_PIN H17   IOSTANDARD TMDS_33 } [get_ports {TMDS_0_clk_n}];
set_property -dict { PACKAGE_PIN H16   IOSTANDARD TMDS_33 } [get_ports {TMDS_0_clk_p}];
set_property -dict { PACKAGE_PIN D20   IOSTANDARD TMDS_33 } [get_ports {TMDS_0_data_n[0]}];
set_property -dict { PACKAGE_PIN D19   IOSTANDARD TMDS_33 } [get_ports {TMDS_0_data_p[0]}];
set_property -dict { PACKAGE_PIN B20   IOSTANDARD TMDS_33 } [get_ports {TMDS_0_data_n[1]}];
set_property -dict { PACKAGE_PIN C20   IOSTANDARD TMDS_33 } [get_ports {TMDS_0_data_p[1]}];
set_property -dict { PACKAGE_PIN A20   IOSTANDARD TMDS_33 } [get_ports {TMDS_0_data_n[2]}];
set_property -dict { PACKAGE_PIN B19   IOSTANDARD TMDS_33 } [get_ports {TMDS_0_data_p[2]}];

##Switches
set_property -dict { PACKAGE_PIN G15   IOSTANDARD LVCMOS33 } [get_ports {sw_res}];
set_property -dict { PACKAGE_PIN P15   IOSTANDARD LVCMOS33 } [get_ports {sw_dir}];
# set_property -dict { PACKAGE_PIN W13   IOSTANDARD LVCMOS33 } [get_ports {sw3}];
# set_property -dict { PACKAGE_PIN T16   IOSTANDARD LVCMOS33 } [get_ports {sw4}];

## false path
#set_clock_groups -asynchronous -group [get_clocks clk_fpga_0] \
#    -group [get_clocks -include_generated_clocks clk_fpga_0 -filter {NAME !~ clk_fpga_0}]
