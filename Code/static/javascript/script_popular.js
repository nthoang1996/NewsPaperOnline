function generateNavBarAtRight()
    {
      let authorization=1;
      var nav_right = document.getElementById("nav-user-manament");
      var li = document.createElement("li");
      li.setAttribute('style',"margin-top:5%;")
      var a = document.createElement("a");
      a.text = "UserName";
      a.setAttribute('style','color: black; width: 205px; font-weight:50; border: 1px solid white; border-radius: 5%; background-color:#CCCCCC;padding-top:5px; padding-bottom:5px;');
      li.appendChild(a);
      var ul= document.createElement("ul");
      ul.setAttribute('style','z-index: 2;')
      var sub_li= document.createElement("li");
      var a1 = document.createElement("a");
      a1.setAttribute('href','/template/profile_view.html');
      a1.text="Xem thông tin tài khoản";
      sub_li.appendChild(a1);
      ul.appendChild(sub_li);
      var sub_li1= document.createElement("li");
      var a2 = document.createElement("a");
      a2.setAttribute('href','/template/change_password_view.html');
      a2.text="Đổi mật khẩu";
      sub_li1.appendChild(a2);
      ul.appendChild(sub_li1);
      if(authorization == 2)//phong vien
      {
        var sub_li3= document.createElement("li");
        var a4 = document.createElement("a");
        a4.setAttribute('href','/template/list_item_view.html');
        a4.text="Quản lý bài viết";
        sub_li3.appendChild(a4);
        ul.appendChild(sub_li3);
      }

      if(authorization > 2)//bien tap vien
      {
        var sub_li4= document.createElement("li");
        var a5 = document.createElement("a");
        a5.setAttribute('href','#');
        a5.text="Quản lý bài viết";
        sub_li4.appendChild(a5);
        ul.appendChild(sub_li4);
      }
      if(authorization > 3)//admin
      {
        var sub_li5= document.createElement("li");
        var a6 = document.createElement("a");
        a6.setAttribute('href','#');
        a6.text="Quản lý nhân viên";
        sub_li5.appendChild(a6);
        ul.appendChild(sub_li5);
      }
      var sub_li2= document.createElement("li");
      var a3 = document.createElement("a");
      a3.setAttribute('href','#');
      a3.text="Đăng xuất";
      sub_li2.appendChild(a3);
      ul.appendChild(sub_li2);
      li.appendChild(ul);
      if(authorization > 0)
        nav_right.appendChild(li);
      else
      {
        var sub_li6= document.createElement("li");
        var a7 = document.createElement("a");
        a7.setAttribute('href','/template/login_view.html');
        a7.setAttribute('style','color:white;')
        a7.text="Login";
        sub_li6.appendChild(a7);
        nav_right.appendChild(sub_li6);   
      }
    }