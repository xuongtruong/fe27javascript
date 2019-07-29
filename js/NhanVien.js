// Tạo lớp đối tượng nhân viên
function NhanVien(maNV, tenNV, email, matKhau,ngaySinh, chucVu){
    this.maNV = maNV;
    this.tenNV = tenNV;
    this.email = email;
    this.matKhau = matKhau;
    this.ngaySinh = ngaySinh;
    this.chucVu = chucVu;
    this.luongCB = 400;
    this.tongLuong = 0;
    // Tổng lương = hệ số lương * luong cơ bản
    // Sếp : 3
    // Trưởng phòng : 1,5
    // Nhân viên : 1
    this.tinhTongLuong = function (){
        if(this.chucVu === "Sếp"){
            this.tongLuong = this.luongCB * 3;
        }
        else if(this.chucVu === "Trưởng phòng"){
            this.tongLuong = this.luongCB * 1.5;
        }
        else if (this.chucVu === "Nhân viên"){
            this.tongLuong = this.luongCB;
        }
    }
}