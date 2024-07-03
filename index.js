class NhanVien {
    constructor(taiKhoan, hoTen, email, ngayLam, chucVu, luongCB, gioLam) {
        this.taiKhoan = taiKhoan;
        this.hoTen = hoTen;
        this.email = email;
        this.ngayLam = ngayLam;
        this.chucVu = chucVu;
        this.luongCB = luongCB;
        this.gioLam = gioLam;
        this.tongLuong = this.tinhTongLuong();
        this.xepLoai = this.xepLoaiNV();
    }

   
    tinhTongLuong() {
        let tongLuong = 0;
        switch (this.chucVu) {
            case 'Giám đốc':
                tongLuong = this.luongCB * 3;
                break;
            case 'Trưởng phòng':
                tongLuong = this.luongCB * 2;
                break;
            case 'Nhân viên':
                tongLuong = this.luongCB;
                break;
            default:
                tongLuong = this.luongCB;
        }
        return tongLuong;
    }

    
    xepLoaiNV() {
        if (this.gioLam >= 192) {
            return 'Xuất sắc';
        } else if (this.gioLam >= 176) {
            return 'Giỏi';
        } else if (this.gioLam >= 160) {
            return 'Khá';
        } else {
            return 'Trung bình';
        }
    }
}


function capNhatThongTinBangHTML(nhanVien) {
    let tableDanhSach = document.getElementById('tableDanhSach');
    let newRow = tableDanhSach.insertRow();
    newRow.innerHTML = `
        <td>${nhanVien.taiKhoan}</td>
        <td>${nhanVien.hoTen}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngayLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tongLuong}</td>
        <td>${nhanVien.xepLoai}</td>
        <td>
            <button class="btn btn-warning">Edit</button>
            <button class="btn btn-danger">Delete</button>
        </td>
    `;
}


document.getElementById('btnThemNV').addEventListener('click', function() {
   
    let taiKhoan = document.getElementById('tknv').value;
    let hoTen = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let ngayLam = document.getElementById('datepicker').value;
    let luongCB = parseFloat(document.getElementById('luongCB').value);
    let chucVu = document.getElementById('chucvu').value;
    let gioLam = parseInt(document.getElementById('gioLam').value);

   
    let nhanVienMoi = new NhanVien(taiKhoan, hoTen, email, ngayLam, chucVu, luongCB, gioLam);

    capNhatThongTinBangHTML(nhanVienMoi);
});

function xoaNhanVien(taiKhoan) {
    let tableDanhSach = document.getElementById('tableDanhSach');
    for (let i = 0; i < tableDanhSach.rows.length; i++) {
        if (tableDanhSach.rows[i].cells[0].textContent === taiKhoan) {
            tableDanhSach.deleteRow(i);
            break;
        }
    }
}


function capNhatNhanVien(taiKhoan) {
    let tableDanhSach = document.getElementById('tableDanhSach');
    for (let i = 0; i < tableDanhSach.rows.length; i++) {
        if (tableDanhSach.rows[i].cells[0].textContent === taiKhoan) {
            document.getElementById('tknv').value = tableDanhSach.rows[i].cells[0].textContent;
            document.getElementById('name').value = tableDanhSach.rows[i].cells[1].textContent;
            document.getElementById('email').value = tableDanhSach.rows[i].cells[2].textContent;
            document.getElementById('datepicker').value = tableDanhSach.rows[i].cells[3].textContent;
            document.getElementById('luongCB').value = tableDanhSach.rows[i].cells[5].textContent;

            let chucVu = tableDanhSach.rows[i].cells[4].textContent;
            document.getElementById('chucvu').value = chucVu;

            let gioLam = parseInt(tableDanhSach.rows[i].cells[6].textContent);
            document.getElementById('gioLam').value = gioLam;

           
            $('#myModal').modal('show');
            break;
        }
    }
}


document.getElementById('tableDanhSach').addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-danger')) {
        let taiKhoan = event.target.closest('tr').cells[0].textContent;
        xoaNhanVien(taiKhoan);
    }
});


document.getElementById('tableDanhSach').addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-warning')) {
        let taiKhoan = event.target.closest('tr').cells[0].textContent;
        capNhatNhanVien(taiKhoan);
    }
});

document.getElementById('btnTimNV').addEventListener('click', function() {
    let searchName = document.getElementById('searchName').value.toLowerCase();
    let tableDanhSach = document.getElementById('tableDanhSach');
    for (let i = 0; i < tableDanhSach.rows.length; i++) {
        let xepLoai = tableDanhSach.rows[i].cells[6].textContent.toLowerCase();
        if (xepLoai.includes(searchName)) {
            tableDanhSach.rows[i].style.display = '';
        } else {
            tableDanhSach.rows[i].style.display = 'none';
        }
    }
});