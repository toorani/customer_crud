import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

abstract class ElementBase<TComponent, THTMLElement>{
    abstract getElementName(): string;
    nativeElement: THTMLElement;
    debugElement: DebugElement;
    debugElements: DebugElement[];

    constructor(fixture: ComponentFixture<TComponent>) {
        this.debugElement = fixture.debugElement.query(By.css(this.getElementName()));
        this.debugElements = fixture.debugElement.queryAll(By.css(this.getElementName()));
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

}

export class H2Element<TComponent> extends ElementBase<TComponent, HTMLHeadingElement> {
    getElementName(): string {
        return "h2"
    }

}
export class H3Element<TComponent> extends ElementBase<TComponent, HTMLHeadingElement> {
    getElementName(): string {
        return "h3"
    }

}