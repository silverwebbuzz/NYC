import { async, TestBed } from '@angular/core/testing';
import { OptionsconnectionsComponent } from './optionsconnections.component';
describe('OptionsconnectionsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [OptionsconnectionsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(OptionsconnectionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=optionsconnections.component.spec.js.map