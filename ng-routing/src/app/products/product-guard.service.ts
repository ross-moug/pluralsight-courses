import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot
} from '@angular/router';
import { ProductEditComponent } from './product-edit.component';

@Injectable()
export class ProductGuardService implements CanDeactivate<ProductEditComponent> {

  canDeactivate(component: ProductEditComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean {
    if (component.isDirty()) {
      const productName = component.product.productName || 'New Product';
      return confirm(`Navigate away and lose all changes to ${productName}?`);
    }

    return true;
  }
}
