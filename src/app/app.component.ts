import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import {Component, HostBinding} from '@angular/core'
import {OverlayContainer} from '@angular/cdk/overlay'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'

/**
 * Created at 1397/12/14 (2019/3/5).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const THEME_DARKNESS_SUFFIX = `-dark`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AngularMaterialDynamicThemes'
  
  @HostBinding('class') activeThemeCssClass: string
  isThemeDark = false
  activeTheme: string
  themes: string[] = [
    'deeppurple-amber',
    'indigo-pink',
    'pink-bluegrey',
    'purple-green',
  ]
  
  // For navigation (sidenav/toolbar). Isn't related to dynamic-theme-switching:
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches)
  )
  
  // `breakpointObserver` is for navigation (sidenav/toolbar). Isn't related to dynamic-theme-switching:
  constructor(
    private breakpointObserver: BreakpointObserver,
    private overlayContainer: OverlayContainer,
  ) {
    // Set default theme here:
    this.setActiveTheme('deeppurple-amber', false)
  }
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']
  dataSource = ELEMENT_DATA
  
  setActiveTheme(theme: string, darkness: boolean = null) {
    if (darkness === null)
      darkness = this.isThemeDark
    else if (this.isThemeDark === darkness) {
      if (this.activeTheme === theme) return
    } else
      this.isThemeDark = darkness
    
    this.activeTheme = theme
    
    const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme
    
    const classList = this.overlayContainer.getContainerElement().classList
    if (classList.contains(this.activeThemeCssClass))
      classList.replace(this.activeThemeCssClass, cssClass)
    else
      classList.add(cssClass)
    
    this.activeThemeCssClass = cssClass
  }
  
  toggleDarkness() {
    this.setActiveTheme(this.activeTheme, !this.isThemeDark)
  }
}

export interface PeriodicElement {
  name: string
  position: number
  weight: number
  symbol: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
]
