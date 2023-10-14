routine-level on error undo, throw.
assign propath = propath + ',' + ".,/usr/dlc,/usr/dlc/bin,/usr/dlc/tty,/usr/dlc/src,/usr/ArqDocker/OE_101b_fcs_src/,/usr/ArqDocker/execProgress,/usr/ArqDocker/execProgress/Includes".

&GLOBAL-DEFINE WEBSTREAM STREAM WebStream

def new global shared {&WEBSTREAM}.

def var retorno as longchar init "".
/* OUTPUT {&WEBSTREAM}  TO /usr/ArqDocker/execProgress/contet.txt. */

output to "WEB".
    RUN /usr/ArqDocker/execProgress/ait_teste.r.
output  close.


catch e-sys as Progress.Lang.SysError:
   message e-sys:getMessage(1).
end catch.
finally:
   quit.
end finally.
