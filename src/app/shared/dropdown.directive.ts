import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen:boolean=false

  // @HostListener('click',['$event'])
  // toggleOpenClass(event:Event){
  //   this.isOpen=!this.isOpen
  //   console.log(event.target)
    // console.log(this.elRef.nativeElement.contains(event.target))
  // }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    // console.log(event.target)
    // console.log(this.elRef)
    // console.log(this.elRef.nativeElement)
    // console.log(this.elRef.nativeElement.contains(event.target))
    //the element on which the directive is placed, is the reference
    //element, which is accessed by this.elRef.nativeElement (elRef:{nativeElement:referenceElement}), the reference element contains
    //the toggle dropdown button and other elements don't contain the button.
  }

  constructor(private elRef:ElementRef) { }

}
