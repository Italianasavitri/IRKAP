import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {DxDataGridComponent, DxCheckBoxComponent} from 'devextreme-angular';
import {Search} from './rkap.model';
import {RkapService} from './rkap.service';
import notify from 'devextreme/ui/notify';

declare const $: any;

@Component({
  selector: 'app-rkap',
  templateUrl: './rkap.component.html',
  styleUrls: ['./rkap.component.scss'],
  providers: [RkapService]
})
export class RKAPComponent implements AfterViewInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  contextItems: any;
  target: any;
  addVisible = false;
  menuVisible = false;
  diskusiVisible = false;
  detail: any;
  text: any;
  popupVisible = false;
  confVisible = false;
  progressVisible = false;
  progressTitle: any;
  progressContent: any;

  // roles: any[];
  gridDataSource: any = {};
  search: Search;
  isDetail = false;
  isDelete = false;
  isCancel = false;
  isAdv = false;
  isAdd = false;
  isEdit = false;
  isDiskusi = false;

  chevron = 'chevrondown';
  fakeArray: any;
  no = 0;
  page = 1;
  limitVal = 5;
  offset = 0;
  jumlahHal = 0;
  minLimitShow = 1;
  maxLimitShow = 10;
  activeClass = 5;

  constructor(
    private elementRef: ElementRef,
    @Inject(RkapService) private rkapService: RkapService
  ) {
    this.search = {
      rjppid: '',
      sid: '',
      codeid: '',
      rkapid: '',
    };

    this.contextItems = [
      {
        text: 'Edit',
        disabled: false,
        beginGroup: false,
        items: false
      },
      {
        text: 'Detail',
        disabled: false,
        beginGroup: false,
        items: false
      },
      {
        text: 'Delete',
        disabled: false,
        beginGroup: false,
        items: false
      },
      {
        text: 'Diskusi',
        disabled: false,
        beginGroup: false,
        items: false
      }
    ];

    this.pagination();
  }

    //pagination
    range(value){
      var nilai = Math.ceil(value/this.limitVal);
      this.jumlahHal = nilai;
      this.fakeArray = new Array(nilai);
    }
  
    limit(event){
      this.activeClass = event.target.id;
      this.limitVal = event.target.id;
      this.offset = 0;
      this.page = 1;
      this.pagination();
    }
  
    doneClick(event){
      this.offset = event.target.id;
      this.pagination();
    }
  
    next(){
      if (this.page==this.jumlahHal) {
        alert('ini halaman terakhir');
      }else{
        this.offset = Number(this.offset)+1;
        this.pagination();
      }
    }
  
    prev(){
      if (Number(this.page)==1) {
        console.log('hal awal');
      }else{
        this.offset = Number(this.offset)-1;
        this.pagination();
      }
    }
  
    pagination(){
      this.page = Number(this.offset)+1;
      if (this.page==this.maxLimitShow+1) {
        this.minLimitShow = Number(this.page);
        this.maxLimitShow = Number(this.page)+10;
      }else if(this.page==this.minLimitShow-1){
        this.minLimitShow = Number(this.page)-9;
        this.maxLimitShow = Number(this.page);
      }
      
      this.rkapService.getLimit(this.offset,this.limitVal)
      .subscribe(resp => {
        console.log(resp);
        this.gridDataSource = resp.d.list;
        this.range(resp.d.total);
      }, err => {
        console.log(err);
      })
    }
    //end pagination
    
  refresh() {
    this.rkapService.getAll().subscribe(resp => {
      this.gridDataSource = resp.d.list;
    }, err => {
      console.log(err);
    })
    this.dataGrid.instance.refresh();
  }

  getRoleData() {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    this.rkapService.getAll().subscribe(resp => {
      this.rkapService.getAllRoleAuth().subscribe(respAuth => {
        resp.forEach((value, index) => {
          const menus = [];
          const menu = respAuth.filter(element => {
            return element.rkapid.id === value.id && element.menuTab.activationCode === 'Y';
          });

          if (Array.isArray(menu)) {
            menu.forEach(menuItem => {
              menus.push(menuItem.menuTab.menuDesciption.toString());
            });
          } else {
            if (typeof menu !== 'undefined') {
              menus.push(menu.menuTab.menuDesciption.toString());
            }
          }

          resp[index].menu = menus;
        })
      });
      this.gridDataSource = resp.filter(data => data.activationCode === 'Y');
    });
  }

  ngAfterViewInit() {
    this.addNewButton()
  }

  addNewButton() {
    const ini = this;
    const d1 = this.elementRef.nativeElement.getElementsByClassName('dx-toolbar-before')[0];
    const $customButton = $('<div id="addNewRole">').dxButton({
      icon: 'add',
      text: 'Entri RKAP',
      type: 'default',
      onClick: function () {
        ini.isAdd = true;
        ini.addVisible = ini.isAdd;
      }
    });

    d1.append($customButton[0]);
  }

  showAdvSearch() {
    this.isAdv = !this.isAdv;
    if (this.isAdv) {
      this.chevron = 'chevronup';
    } else {
      this.chevron = 'chevrondown';
    }

  }

  searching() {
    this.rkapService.getByName(this.search.rkapid).subscribe(resp => {
      this.rkapService.getAllRoleAuth().subscribe(respAuth => {
        resp.forEach((value, index) => {
          const menus = [];
          const menu = respAuth.filter(element => {
            return element.userRole.id === value.id;
          });

          if (Array.isArray(menu)) {
            menu.forEach(menuItem => {
              menus.push(menuItem.menuTab.menuDesciption.toString());
            });
          } else {
            if (typeof menu !== 'undefined') {
              menus.push(menu.menuTab.menuDesciption.toString());
            }
          }

          resp[index].menu = menus;
        })
      });
      if (this.search.rkapid !== '') {
        this.gridDataSource = resp.filter(role => role.roleName === this.search.rkapid).filter(data => data.activationCode === 'Y');
      } else {
        this.gridDataSource = resp.filter(data => data.activationCode === 'Y');
      }
    });
  }

  advSearch() {
    this.rkapService.getByData(this.search).subscribe(resp => {
      this.rkapService.getAllRoleAuth().subscribe(respAuth => {
        resp.forEach((value, index) => {
          const menus = [];
          const menu = respAuth.filter(element => {
            return element.userRole.id === value.id;
          });

          if (Array.isArray(menu)) {
            menu.forEach(menuItem => {
              menus.push(menuItem.menuTab.menuDesciption.toString());
            });
          } else {
            if (typeof menu !== 'undefined') {
              menus.push(menu.menuTab.menuDesciption.toString());
            }
          }

          resp[index].menu = menus;
        })
      });
      if (this.search.rkapid !== '') {
        this.gridDataSource = resp.filter(role => role.roleName === this.search.rkapid).filter(data => data.activationCode === 'Y');
      } else {
        this.gridDataSource = resp.filter(data => data.activationCode === 'Y');
      }
    });
  }

  showMenu(event): void {
    this.target = event;
    this.menuVisible = true;
    this.detail = this.gridDataSource.filter(dataSource => dataSource.id === event)[0];
  }

  itemClick(e) {
    if (!e.itemData.items) {
      this.text = e.itemData.text;
      if (this.text === 'Edit') {
        this.isEdit = true;
        this.isAdd = true;
        this.addVisible = true;
      } else if (this.text === 'Detail') {
        this.isDetail = true;
        this.isAdd = true;
        this.addVisible = true;
      } else if (this.text === 'Delete') {
        this.isDelete = true;
        this.confVisible = true;
        this.isCancel = false;
      } else if (this.text === 'Diskusi') {
        this.diskusiVisible = true;
        this.isCancel = false;
      }
    }
  }

  click() {
  }

  back() {
    this.isDetail = false;
    this.addVisible = false;
    this.isAdd = false;
  }

  onHideMenu() {
    this.menuVisible = false;
  }

  onHideConf() {
    this.confVisible = false;
    this.isDelete = false;
    this.refresh();
    // this.getRoleData();
  }

  onHideProgress() {
    this.progressVisible = false;
  }

  onHideAdd() {
    this.addVisible = false;
    this.isAdd = false;
    this.isEdit = false;
    this.isDetail = false;
    this.target = null;
    this.refresh();
    // this.getRoleData();
  }

  delete() {
    this.confVisible = false;
    this.isDelete = false;
    this.isCancel = false;
  }

  onDeleteConf() {
    this.rkapService.getById(this.target).subscribe(role => {
      this.rkapService.delete(role.d).subscribe(resp => {
        // this.getRoleData();
        notify({
          closeOnClick: true,
          displayTime: 3000,
          message: 'Item successfully deleted.'
        }, 'success');
        this.refresh();
      }, err => {
        if (err.status === 200) {
          this.getRoleData();
          notify({
            closeOnClick: true,
            displayTime: 3000,
            message: 'Item successfully deleted.'
          }, 'success');
        } else {
          notify({
            closeOnClick: true,
            displayTime: 3000,
            message: 'Deleting failed.'
          }, 'error');
        }
      })
    })
  }
  onCancelConf() {}
}
