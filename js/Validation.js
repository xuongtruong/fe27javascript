function Validation(){
    //Kiểm tra rỗng
    this.KiemTraRong = function(idInput, idThongBao, ndThongBao){
        var value = getEle(idInput).value;
        var isValid = true;
        if(value === ""){
            isValid = false;
            getEle(idThongBao).style.display ="block";
            getEle(idThongBao).innerHTML = ndThongBao;
        }
        else{
            getEle(idThongBao).innerHTML ="";
        }
        return isValid;
    }
    //Kiểm tra định dạng chữ
    this.KiemTraDinhDangChu = function(idInput, idThongBao, ndThongBao){
        var value = getEle(idInput).value;
        var isValid = true;
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
        if(!pattern.test(value)){ //False
            isValid = false;
            getEle(idThongBao).style.display ="block";
            getEle(idThongBao).innerHTML = ndThongBao;
        }
        else{
            getEle(idThongBao).innerHTML ="";
        }
        return isValid;
    }
    //Kiểm tra mật khẩu
    this.KiemTraMatKhau = function(idInput, idThongBao, ndThongBao){
        var value = getEle(idInput).value;
        var isValid = true;
        var pattern = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{3,8}$");
        if(!pattern.test(value)){ //False
            isValid = false;
            getEle(idThongBao).style.display ="block";
            getEle(idThongBao).innerHTML = ndThongBao;
        }
        else{
            getEle(idThongBao).innerHTML ="";
        }
        return isValid;
    }
    //Kiểm tra độ dài
    this.KiemTraDoDai = function(idInput, idThongBao, ndThongBao){
        var value = getEle(idInput).value;
        var isValid = true;
        if(value.length < 3 || value.length > 8){
            isValid = false;
            getEle(idThongBao).style.display ="block";
            getEle(idThongBao).innerHTML = ndThongBao;
        }
        else{
            getEle(idThongBao).innerHTML ="";
        }
        return isValid;
    }
    //Kiểm tra email
    this.KiemTraEmail = function(idInput, idThongBao, ndThongBao){
        var value = getEle(idInput).value;
        var isValid = true;
        var pattern = new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
		+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
        if(!pattern.test(value)){ //False
            isValid = false;
            getEle(idThongBao).style.display ="block";
            getEle(idThongBao).innerHTML = ndThongBao;
        }
        else{
            getEle(idThongBao).innerHTML ="";
        }
        return isValid;
    }
    //Kiểm tra chức vụ
    this.KiemTraChucVu= function(){
        var chucVuElm = getEle("chucvu");
        var isValid = true;
        if(chucVuElm.selectedIndex === 0){ //False
            isValid = false;
            getEle("tbChucVu").style.display ="block";
            getEle("tbChucVu").innerHTML = "**Vui lòng chọn chức vụ !";
        }
        else{
            getEle("tbChucVu").innerHTML ="";
        }
        return isValid;
    }

}