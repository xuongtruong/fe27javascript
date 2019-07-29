/*
Quản lý nhân viên
-- Thêm nhân viên
*/
// new hiểu như một Constructor

// var nhanVien = new NhanVien("001","Xuong", "huynhxuong134", "123", "12/07", "Sếp");
// console.log(nhanVien);

// Thêm Nhân Viên
function themNguoiDung(){
    console.log("Thêm người dùng");
}
var mangNhanVien = [];
var validation = new Validation();
function getEle(id){
    return document.getElementById(id);
}
// Lấy dữ liệu
var jsonData = localStorage.getItem("DSNV");
if (jsonData){
    //Chuyển dữ liệu
    mangNhanVien = JSON.parse(jsonData);
    // console.log(mangNhanVien);
    HienThi(mangNhanVien);
}
else{
    mangNhanVien = [];
}
function LayThongTin(){
        // Lấy thông tin
        var maNV = getEle("msnv").value;
        var tenNV = getEle("name").value;
        var email = getEle("email").value;
        var matKhau = getEle("password").value;
        var ngaySinh = getEle("datepicker").value;
        var chucVu = getEle("chucvu").value;
        // Tạo đổi tượng
        var nhanVien = new NhanVien(maNV, tenNV, email, matKhau, ngaySinh, chucVu);
        nhanVien.tinhTongLuong();
        return nhanVien;
}
// Lấy thông tin nhân viên
function ThemNhanVien(){
    var nhanVien = LayThongTin();
    var isValid = true;
    // &= kiếm tra giá trị
    isValid &= validation.KiemTraRong("msnv","tbMaNV","***Vui lòng nhập mã !");
    isValid &= 
        validation.KiemTraDinhDangChu("name","tbTen","***Vui lòng nhập đúng ký tự!") &&
        validation.KiemTraRong("name","tbTen","***Vui lòng nhập tên !");
    isValid &= validation.KiemTraEmail("email","tbEmail","**Email không đúng định dạng");
    isValid &= validation.KiemTraMatKhau("password","tbMatKhau","**Mật khẩu sai!(>3 và <8 ký tự, bao gồm ký tự đặc biệt)");
    // isValid = validation.KiemTraMatKhau("password","tbMatKhau","**Mật khẩu phải(>3 và <8 ký tự)!");
    isValid &= validation.KiemTraChucVu();
    // Thêm nhân viên vào mảng
    if (isValid){
        mangNhanVien.push(nhanVien);
        console.log(mangNhanVien);
    }
    // Hiển thị
    HienThi(mangNhanVien);
}
function HienThi(mangHienThi){
    var tableDanhSach = getEle("tableDanhSach");
    var content ="";
    for (var i = 0; i< mangHienThi.length; i++){
        var nhanVien = mangHienThi[i];
        // template String - hiển thị
        content += `
            <tr>
                <td>${nhanVien.maNV}</td>
                <td>${nhanVien.tenNV}</td>
                <td>${nhanVien.email}</td>
                <td>${nhanVien.ngaySinh}</td>
                <td>${nhanVien.chucVu}</td>
                <td>${nhanVien.tongLuong}</td>
                <td>
                <botton class = "btn btn-danger" data-id = "${nhanVien.maNV}" onclick = "XoaNhanVien(event)">Xóa</botton>
                <botton class = "btn btn-primary" data-toggle="modal"
                data-target="#myModal" data-id = "${nhanVien.maNV}" onclick = "HienThiThongTinLenForm(event)">Sửa</botton>
                </td>
            </tr>
        `
    }
    tableDanhSach.innerHTML = content;
}

// Local storage - bộ nhớ public của trình duyệt
// Chỉ nhận vào kiểu dữ liệu JSON
function LuuDuLieu(){
    // Chuyển kiểu dữ kiệu về chuỗi JSON
    var jsonData = JSON.stringify(mangNhanVien);
    // Lưu vào local Storage : key value
    localStorage.setItem("DSNV", jsonData);
}
//Xóa nhân viên
function TimViTri(id){
    // duyệt mảng lấy nv
    for (var i = 0; i< mangNhanVien.length; i++){
        var nhanVien = mangNhanVien[i];
        if(nhanVien.maNV === id){
            return i;
        }
    }
    return -1;
}
function XoaNhanVien(event){
    //Lấy Id cần xóa
    var btnXoa = event.target; //Nơi xảy ra sự kiện
    var idXoa = btnXoa.getAttribute("data-id"); //Lấy sự kiện

    //Kiểm tra id
    var index = TimViTri(idXoa);

    //Xóa nhân viên
    mangNhanVien.splice(index,1);

    HienThi(mangNhanVien);
}

//Sửa nhân viên
//Hiển thị thông tin nhân viên
function HienThiThongTinLenForm(){
    var btnSua = event.target; //Nơi xảy ra sự kiện
    var idSua = btnSua.getAttribute("data-id"); //Lấy sự kiện
    var index = TimViTri(idSua);

    var nhanVien = mangNhanVien[index];
    getEle("msnv").value = nhanVien.maNV;
    getEle("name").value = nhanVien.tenNV;
    getEle("email").value = nhanVien.email;
    getEle("password").value = nhanVien.matKhau;
    getEle("datepicker").value = nhanVien.ngaySinh;
    getEle("chucvu").value = nhanVien.chucVu;
    // Mã nhân viên không được sửa
    getEle("msnv").setAttribute("readonly" , true);
}
function CapNhatNhanVien(event){
    //Lấy thông tin & Tổ chức đối tượng (nhân viên mới)
    var nhanVien = LayThongTin();

    //Đè lên đối tượng cần sửa
    var index = TimViTri(nhanVien.maNV);
    mangNhanVien[index] = nhanVien;
    HienThi(mangNhanVien);

}
//Tìm nhân viên
function TimNhanVien(){
    var mangTimKiem = [];
    var tenNVCanTim = getEle("searchName").value;
    tenNVCanTim = tenNVCanTim
    .toLowerCase() //Chữ thường
    .replace(/\s/g, ''); //Bỏ khoảng trắng

    // Dùng JS thuần
    // for (var i = 0; i< mangNhanVien.length; i++){
    //     if(mangNhanVien[i].tenNV.toLowerCase().replace(/\s/g, '') === tenNVCanTim){
    //        mangTimKiem.push(mangNhanVien[i]);
    //     }
    // }

    //JS theo chuẩn es6
    //Hàm để gọi hàm khác - callback function
    //Tách nhân viên trong mangNhanVien đưa vào callback function - nếu đúng đk thì thêm vào mangTimKiem
    // Hàm indexOff tìm chuỗi trong chuỗi
    mangTimKiem = mangNhanVien.filter(function(nhanVien){
        return nhanVien.tenNV.toLowerCase().replace(/\s/g, '').indexOf(tenNVCanTim) !== -1; 
    });
    // console.log("TCL: TimNhanVien -> mangTimKiem", mangTimKiem);
    HienThi(mangTimKiem);
}

// Gọi hàm thay onclick - callback function
// getEle("btnThemNV").addEventListener("click", ThemNhanVien);
getEle("btnLuu").addEventListener("click", LuuDuLieu);
getEle("btnCapNhat").addEventListener("click", CapNhatNhanVien);
getEle("btnTimNV").addEventListener("click", TimNhanVien);
getEle("searchName").addEventListener("keyup",TimNhanVien); 
// getEle("btnLayDL").addEventListener("click", LayDuLieu);
// Cách để gọi hàm lắng nghe sự kiện truyền tham số
// getEle("btnThemNV").addEventListener("click", function(){
//     ThemNhanVien();
// });



