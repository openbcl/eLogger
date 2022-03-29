import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Dialog } from "primeng/dialog";

@Component({ template: '' })
export abstract class BaseDialogComponent {
    @Input()
    visible: boolean;
    
    @Output()
    visibleChange = new EventEmitter<boolean>();

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    showDialogMaximized(dialog: Dialog, checkPWA = false) {
        if (checkPWA) {
            if (['fullscreen', 'standalone', 'minimal-ui'].some((displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches)) {
                dialog.maximize()
            }
        } else {
            dialog.maximize();
        }
    }
}