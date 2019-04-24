export class Departemen {
    deptid: number;
    parent_deptid: string;
    dept_name: any;
    manager_id: any;
    tgl_mulai: any;
    tgl_akhir: any;
    isactive: any;
    level: any;
    cost_center: any;
  }
  
  export class Menu {
    authId?: string;
    menuParent?: string;
    menuId: string;
    read: any;
    write: any;
    text: string;
    items?: Menu[];
  }
  
  export class KategoriAktif {
    ID: number;
    Nama: string;
  }
  
  export class Search {
    deptid: number;
    dept_name: string;
    manager_id: string;
  }
  