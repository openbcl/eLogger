import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({ template: '' })
export abstract class BasicDialogComponent {
    @Input()
    visible: boolean;
    
    @Output()
    visibleChange = new EventEmitter<boolean>();

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }
}