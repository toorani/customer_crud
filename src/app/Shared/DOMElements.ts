import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

abstract class ElementBase<TComponent, THTMLElement>{
    abstract getElementName(): string;
    nativeElement: THTMLElement;
    debugElement: DebugElement;
    debugElements: DebugElement[];
    protected fixture: ComponentFixture<TComponent>;

    constructor(_fixture: ComponentFixture<TComponent>, textContent = '') {
        this.fixture = _fixture;
        this.debugElements = _fixture.debugElement.queryAll(By.css(this.getElementName()));
        if (textContent == '') {
            this.debugElement = _fixture.debugElement.query(By.css(this.getElementName()));
        }
        else {
            this.debugElement = this.debugElements.find(x => new String(x.nativeElement.textContent).trim() === textContent);
        }
        this.nativeElement = this.debugElement.nativeElement as THTMLElement;
    }

}

export class TableElement<TComponent> extends ElementBase<TComponent, HTMLTableElement> {
    getElementName(): string {
        return "table"
    }

}

export class AnchorElement<TComponent> extends ElementBase<TComponent, HTMLAnchorElement> {
    getElementName(): string {
        return "a"
    }

    click() {
        this.nativeElement.click();
        this.fixture.detectChanges();
    }

}

export class ButtonElement<TComponent> extends ElementBase<TComponent, HTMLButtonElement> {
    getElementName(): string {
        return "button"
    }
    click() {
        this.nativeElement.click();
        this.fixture.detectChanges();
    }
}

export class H3Element<TComponent> extends ElementBase<TComponent, HTMLHeadingElement> {
    getElementName(): string {
        return "h3"
    }

}

export class FormElement<TComponent> extends ElementBase<TComponent, HTMLFormElement> {
    getElementName(): string {
        return "form"
    }

    sumbit() {
        this.debugElement.triggerEventHandler('submit', null);
        this.fixture.detectChanges();
    }

}