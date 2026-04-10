# Cau truc de xuat (lai giua project moi va ASI_AI)

Muc tieu:

- Giong cach to chuc tai nguyen cua ASI_AI (assets la trung tam).
- Giu nguyen source hien tai (scss, vendor) va tap trung JS trong assets de thong nhat cau truc.

## Thu muc chinh

- index.html # Dashboard chinh (su dung assets/js/main.js -> pages/dashboard.js)
- camera.html # Trang quan ly camera
- monitor.html # Trang giam sat truc tiep
- tracker.html # Trang theo doi hanh trinh
- assets/
    - css/ # CSS build output de HTML su dung truc tiep
    - js/ # Entry JS theo page/module
        - pages/ # dashboard, camera, monitor, tracker
        - charts/ # Module bieu do cho dashboard
    - img/ # Hinh anh giao dien, media dung cho page
    - includes/ # Cac include dung chung (site-header, site-sidebar, ui-common)
- scss/ # Source SCSS goc (giu nguyen)
- vendor/ # Thu vien local (giu nguyen)
- dist/ # Co the giu de tuong thich cu, khong bat buoc dung cho HTML moi

## Nguyen tac su dung

1. Chinh sua giao dien:

- Sua trong scss/ va assets/js.
- Khong sua truc tiep assets/css/style.css vi file nay duoc build.

2. Build CSS:

- npm run sass-dev
- npm run sass-build

3. HTML moi:

- Uu tien link den assets/css va assets/js de dong bo pattern voi ASI_AI.
- Moi page su dung chung sidebar/header qua assets/includes.

## Huong mo rong tiep

- Tach them assets/includes/plugins.js neu can quan ly tap trung cac script CDN.
- Tao them page module moi theo mau assets/js/pages/\*.js.
- Neu can, them script dong bo assets/css -> dist/css cho he thong cu.
