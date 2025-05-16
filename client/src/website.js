const categories = [
    {
        name: "Beds",
        products: [
              { id: 1, name: "Twin Bed", price: 1000000, height: "135cm", width: "190cm", depth: "40cm", img: "https://m.media-amazon.com/images/I/81oC4tO8WML.jpg", url: "https://m.media-amazon.com/images/I/81oC4tO8WML.jpg" },
              { id: 2, name: "Twin XL Beds", price: 1100000, height: "150cm", width: "190cm", depth: "43cm", img: "https://i5.walmartimages.com/seo/LIKIMIO-Twin-XL-Bed-Frames-Outlets-Storage-Upholstered-Headboard-No-Box-Springs-Dark-Gray_fff7a8ab-f6ed-43fc-b7a8-eba9c942c9a2.96a900808c2e15d8fbc5cfda03c5abc2.jpeg", url: "https://i5.walmartimages.com/seo/LIKIMIO-Twin-XL-Bed-Frames-Outlets-Storage-Upholstered-Headboard-No-Box-Springs-Dark-Gray_fff7a8ab-f6ed-43fc-b7a8-eba9c942c9a2.96a900808c2e15d8fbc5cfda03c5abc2.jpeg" },
              { id: 3, name: "Full Bed / Double Bed", price: 1200000, height: "89cm", width: "190cm", depth: "41cm", img: "https://i.ebayimg.com/images/g/HjcAAOSwb5tj~caA/s-l1200.jpg", url: "https://i.ebayimg.com/images/g/HjcAAOSwb5tj~caA/s-l1200.jpg" },
              { id: 4, name: "Queen Bed", price: 1300000, height: "150cm", width: "200cm", depth: "50cm", img: "https://cebu.homemakerfurniture.com/wp-content/uploads/2022/11/Side-scaled.jpg", url: "https://cebu.homemakerfurniture.com/wp-content/uploads/2022/11/Side-scaled.jpg" },
              { id: 5, name: "King Bed", price: 1400000, height: "180cm", width: "200cm", depth: "45cm", img: "https://images-na.ssl-images-amazon.com/images/I/91yKb5+PMiL.jpg", url: "https://images-na.ssl-images-amazon.com/images/I/91yKb5+PMiL.jpg" },
              { id: 6, name: "California King Bed", price: 1500000, height: "200cm", width: "210cm", depth: "60cm", img: "https://m.media-amazon.com/images/I/91jBRB4FyFL.jpg", url: "https://m.media-amazon.com/images/I/91jBRB4FyFL.jpg" },
              { id: 7, name: "Single Bed", price: 1600000, height: "90cm", width: "190cm", depth: "40cm", img: "https://www.mocka.com.au/cdn/shop/files/T03811_LoRes_01_45bbaaaa-1ef3-4a6d-91da-d25758d614bd.jpg?v=1715017063&width=2040", url: "https://www.mocka.com.au/cdn/shop/files/T03811_LoRes_01_45bbaaaa-1ef3-4a6d-91da-d25758d614bd.jpg?v=1715017063&width=2040" },
              { id: 8, name: "Crib", price: 1700000, height: "123cm", width: "195cm", depth: "50cm", img: "https://rukminim2.flixcart.com/image/850/1000/xif0q/bed-mattress/r/y/v/normal-top-single-2-19-33-small-baby-crib-high-resilience-hr-original-imah4eaysrfkzhxy.jpeg?q=90&crop=false", url: "https://rukminim2.flixcart.com/image/850/1000/xif0q/bed-mattress/r/y/v/normal-top-single-2-19-33-small-baby-crib-high-resilience-hr-original-imah4eaysrfkzhxy.jpeg?q=90&crop=false" },
              { id: 9, name: "Toddler Bed", price: 1800000, height: "130cm", width: "201cm", depth: "53cm", img: "https://www.petiteamelie.co.uk/media/catalog/product/cache/9ca5c0ad6f3cfa8a755e363117c2d905/p/l/plume-bundle-bed-with-mattress-70x140-black-petite-amelie_2.jpg", url: "https://www.petiteamelie.co.uk/media/catalog/product/cache/9ca5c0ad6f3cfa8a755e363117c2d905/p/l/plume-bundle-bed-with-mattress-70x140-black-petite-amelie_2.jpg" },
              { id: 10, name: "Bunk Bed", price: 1900000, height: "100cm", width: "199cm", depth: "47cm", img: "https://i5.walmartimages.com/seo/Plank-Beam-Solid-Wood-Queen-over-Queen-Bunk-Bed-for-Adults-Barnwood-Brown_096dda7f-a2ca-4d4c-89d1-e07bd147641a.ff681d2e9562c657c51c6f111cc2e664.jpeg", url: "https://i5.walmartimages.com/seo/Plank-Beam-Solid-Wood-Queen-over-Queen-Bunk-Bed-for-Adults-Barnwood-Brown_096dda7f-a2ca-4d4c-89d1-e07bd147641a.ff681d2e9562c657c51c6f111cc2e664.jpeg" },
              { id: 11, name: "Loft Bed / Wall Bed", price: 2000000, height: "164cm", width: "211cm", depth: "49cm", img: "https://mobileimages.lowes.com/productimages/c35443f0-2ec2-4a15-a58f-285968d40bed/65057066.jpg", url: "https://mobileimages.lowes.com/productimages/c35443f0-2ec2-4a15-a58f-285968d40bed/65057066.jpg" },
              { id: 12, name: "Murphy Bed / Wall Bed", price: 2100000, height: "134cm", width: "197cm", depth: "48cm", img: "https://m.media-amazon.com/images/I/81KWuG6i3zL._AC_UF894,1000_QL80_.jpg", url: "https://m.media-amazon.com/images/I/81KWuG6i3zL._AC_UF894,1000_QL80_.jpg" },
              { id: 13, name: "Daybed", price: 2200000, height: "145cm", width: "202cm", depth: "58cm", img: "https://assets.wfcdn.com/im/84340819/resize-h800-w800%5Ecompr-r85/2472/247226940/Alexz+Wood+Daybed+with+Pop+Up+Trundle+Bed%2C+Mattresses+Not+Included.jpg", url: "https://assets.wfcdn.com/im/84340819/resize-h800-w800%5Ecompr-r85/2472/247226940/Alexz+Wood+Daybed+with+Pop+Up+Trundle+Bed%2C+Mattresses+Not+Included.jpg" },
              { id: 14, name: "Trundle Bed", price: 2300000, height: "102cm", width: "205cm", depth: "47cm", img: "https://m.media-amazon.com/images/I/51G2Zj1JvKL._SL500_.jpg", url: "https://m.media-amazon.com/images/I/51G2Zj1JvKL._SL500_.jpg" },
              { id: 15, name: "Sofa Bed / Sleeper Bed", price: 2400000, height: "105cm", width: "198cm", depth: "43cm", img: "https://bizweb.dktcdn.net/100/153/764/products/ghe-sofa-bed-gia-re-121t-8.jpg?v=1734076750630", url: "https://bizweb.dktcdn.net/100/153/764/products/ghe-sofa-bed-gia-re-121t-8.jpg?v=1734076750630" },
              { id: 16, name: "Platform Bed", price: 2500000, height: "130cm", width: "210cm", depth: "50cm", img: "https://images.thdstatic.com/productImages/2fb5e287-620e-4f11-a97a-9f4cdd448eba/svn/brown-oak-nexera-platform-beds-403996-64_1000.jpg", url: "https://images.thdstatic.com/productImages/2fb5e287-620e-4f11-a97a-9f4cdd448eba/svn/brown-oak-nexera-platform-beds-403996-64_1000.jpg" },
              { id: 17, name: "Canopy Bed", price: 2600000, height: "110cm", width: "190cm", depth: "37cm", img: "https://cdn-images.article.com/products/SKU20066/2890x1500/image119858.jpg?fit=max&w=1200&q=100", url: "https://cdn-images.article.com/products/SKU20066/2890x1500/image119858.jpg?fit=max&w=1200&q=100" },
              { id: 18, name: "Four-Poster Bed", price: 2700000, height: "132cm", width: "204cm", depth: "48cm", img: "https://www.lakkadhaara.com/cdn/shop/products/Florentina-Poster-Bed-Lakkadhaara-21665884242000.jpg?v=1744016467&width=1445", url: "https://www.lakkadhaara.com/cdn/shop/products/Florentina-Poster-Bed-Lakkadhaara-21665884242000.jpg?v=1744016467&width=1445" },
              { id: 19, name: "Storage Bed", price: 2800000, height: "128cm", width: "193cm", depth: "47cm", img: "https://lofthome.com/cdn/shop/collections/storage-beds.jpg?v=1729409988", url: "https://lofthome.com/cdn/shop/collections/storage-beds.jpg?v=1729409988" },
              { id: 20, name: "Adjustable Bed", price: 2900000, height: "119cm", width: "219cm", depth: "60cm", img: "https://www.brentwoodhome.com/cdn/shop/products/0004_brentwood_base1_image00007_1400x.jpg?v=1636590815", url: "https://www.brentwoodhome.com/cdn/shop/products/0004_brentwood_base1_image00007_1400x.jpg?v=1636590815" },
              { id: 21, name: "Twin Bed", price: 3000000, height: "128cm", width: "210cm", depth: "59cm", img: "https://m.media-amazon.com/images/I/81VzkftpjOL.jpg", url: "https://m.media-amazon.com/images/I/81VzkftpjOL.jpg" }
        ]
},
   {
    name: "Sofas",
    products: [
        { id: 101, name: "Sectional Sofa", price: 1000000, height: "80cm", width: "200cm", depth: "90cm", img: "https://sixpenny.com/cdn/shop/files/aria-lshape-medium-weight-linen-jasmine-rice-lifestyle-PDP1-short-r.jpg?v=1741044556&width=2000", url: "https://sixpenny.com/cdn/shop/files/aria-lshape-medium-weight-linen-jasmine-rice-lifestyle-PDP1-short-r.jpg?v=1741044556&width=2000" },
        { id: 102, name: "L-Shaped Sofa", price: 1100000, height: "85cm", width: "220cm", depth: "100cm", img: "https://i5.walmartimages.com/seo/HONBAY-Modern-L-Shaped-Sectional-Convertible-Corner-Sofa-Couch-for-Living-Room-Dark-Grey_7bc5b06e-d7dc-4c0f-bcd6-275e9660e9ab.9adb83374c77723ba96c570c4c237184.jpeg", url: "https://i5.walmartimages.com/seo/HONBAY-Modern-L-Shaped-Sectional-Convertible-Corner-Sofa-Couch-for-Living-Room-Dark-Grey_7bc5b06e-d7dc-4c0f-bcd6-275e9660e9ab.9adb83374c77723ba96c570c4c237184.jpeg" },
        { id: 103, name: "U-Shaped Sofa", price: 1200000, height: "75cm", width: "190cm", depth: "85cm", img: "https://www.cosyhomesltd.co.uk/cdn/shop/files/image_90bf74db-2620-4bfb-853c-acadc2b99fa7.jpg?v=1689783015", url: "https://www.cosyhomesltd.co.uk/cdn/shop/files/image_90bf74db-2620-4bfb-853c-acadc2b99fa7.jpg?v=1689783015" },
        { id: 104, name: "Sofa Bed / Sleeper Sofa", price: 1300000, height: "90cm", width: "230cm", depth: "95cm", img: "https://i5.walmartimages.com/seo/DEALTOPS-Loveseat-Convertible-Sleeper-Sofa-Bed-Black_4ee888bc-e211-4d3f-8156-583449264044.fb216619020d4f78ed23b90a59d39be7.jpeg", url: "https://i5.walmartimages.com/seo/DEALTOPS-Loveseat-Convertible-Sleeper-Sofa-Bed-Black_4ee888bc-e211-4d3f-8156-583449264044.fb216619020d4f78ed23b90a59d39be7.jpeg" },
        { id: 105, name: "Loveseat", price: 1400000, height: "80cm", width: "200cm", depth: "90cm", img: "https://m.media-amazon.com/images/I/81paVXrplaL.jpg", url: "https://m.media-amazon.com/images/I/81paVXrplaL.jpg" },
        { id: 106, name: "Armchair / Single Sofa", price: 1500000, height: "85cm", width: "210cm", depth: "100cm", img: "https://ordinairevietnam.com/cdn/shop/products/MildArmchair-Interior2_700x700.jpg?v=1723515590", url: "https://ordinairevietnam.com/cdn/shop/products/MildArmchair-Interior2_700x700.jpg?v=1723515590" },
        { id: 107, name: "Corner Sofa", price: 1600000, height: "78cm", width: "185cm", depth: "88cm", img: "https://www.daals.co.uk/cdn/shop/files/BOSF-9680-BEIGE-WOV-CHAISE-RHF_WB2.jpg?v=1744616622", url: "https://www.daals.co.uk/cdn/shop/files/BOSF-9680-BEIGE-WOV-CHAISE-RHF_WB2.jpg?v=1744616622" },
        { id: 108, name: "Armless Sofa", price: 1700000, height: "92cm", width: "240cm", depth: "100cm", img: "https://www.daals.co.uk/cdn/shop/files/BOSF-9381-BEIGE-BOU-1ST_main.jpg?v=1742390319", url: "https://www.daals.co.uk/cdn/shop/files/BOSF-9381-BEIGE-BOU-1ST_main.jpg?v=1742390319" },
        { id: 109, name: "Recliner Sofa", price: 1800000, height: "80cm", width: "195cm", depth: "85cm", img: "https://www.nitori.com.vn/cdn/shop/files/115448001_570x570_0ae68442-e1c5-4323-bbbc-b556c0fd3bd4.jpg?v=1697086410", url: "https://www.nitori.com.vn/cdn/shop/files/115448001_570x570_0ae68442-e1c5-4323-bbbc-b556c0fd3bd4.jpg?v=1697086410" },
        { id: 110, name: "Ottoman", price: 1900000, height: "84cm", width: "205cm", depth: "90cm", img: "https://assets.wfcdn.com/im/01380051/compr-r85/2028/202806414/Comacho+Upholstered+Ottoman.jpg", url: "https://assets.wfcdn.com/im/01380051/compr-r85/2028/202806414/Comacho+Upholstered+Ottoman.jpg" },
        { id: 111, name: "Chesterfield Sofa", price: 2000000, height: "86cm", width: "215cm", depth: "95cm", img: "https://www.thechesterfieldcompany.com/_images/_images/l/1891-claridge-sofabed.jpg", url: "https://www.thechesterfieldcompany.com/_images/_images/l/1891-claridge-sofabed.jpg" },
        { id: 112, name: "Scandinavian Sofa", price: 2100000, height: "90cm", width: "230cm", depth: "100cm", img: "https://cdn.webshopapp.com/shops/336719/files/475330711/scandinavian-sofa-jonne.jpg", url: "https://cdn.webshopapp.com/shops/336719/files/475330711/scandinavian-sofa-jonne.jpg" },
        { id: 113, name: "Modern Sofa", price: 2200000, height: "85cm", width: "220cm", depth: "95cm", img: "https://craftassociatesfurniture.com/cdn/shop/products/alaska-felt-modern-wood-sofa-1403-craft-associates-02_1024x1024.jpg?v=1681988303", url: "https://craftassociatesfurniture.com/cdn/shop/products/alaska-felt-modern-wood-sofa-1403-craft-associates-02_1024x1024.jpg?v=1681988303" },
        { id: 114, name: "Leather Sofa", price: 2300000, height: "82cm", width: "200cm", depth: "88cm", img: "https://www.gulmoharlane.com/uploads/gulmoharlane/product-attribute-values/montreal-sand-leather-4s-310326_m.jpg?v=550", url: "https://www.gulmoharlane.com/uploads/gulmoharlane/product-attribute-values/montreal-sand-leather-4s-310326_m.jpg?v=550" },
        { id: 115, name: "Fabric Sofa", price: 2400000, height: "83cm", width: "210cm", depth: "92cm", img: "https://static.wixstatic.com/media/456a4a_f57f5272227d42a39ab52add25e28231~mv2.png/v1/fill/w_980,h_980,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/456a4a_f57f5272227d42a39ab52add25e28231~mv2.png", url: "https://static.wixstatic.com/media/456a4a_f57f5272227d42a39ab52add25e28231~mv2.png/v1/fill/w_980,h_980,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/456a4a_f57f5272227d42a39ab52add25e28231~mv2.png" },
        { id: 116, name: "Velvet Sofa", price: 2500000, height: "88cm", width: "225cm", depth: "97cm", img: "https://media.furniturevillage.co.uk/i/fv/PRODZFRSP000000000041209_bronwyn_3-seater-sofa__lifestyle?$medium$&fmt=auto&fmt=auto&w=579", url: "https://media.furniturevillage.co.uk/i/fv/PRODZFRSP000000000041209_bronwyn_3-seater-sofa__lifestyle?$medium$&fmt=auto&fmt=auto&w=579" },
        { id: 117, name: "Rattan/Wicker Sofa", price: 2600000, height: "79cm", width: "190cm", depth: "85cm", img: "https://cdn.shopaccino.com/kridva/products/duplicate-253749466404551_l.jpg?v=523", url: "https://cdn.shopaccino.com/kridva/products/duplicate-253749466404551_l.jpg?v=523" },
        { id: 118, name: "Modular Sofa", price: 2700000, height: "81cm", width: "200cm", depth: "90cm", img: "https://bizweb.dktcdn.net/thumb/large/100/361/830/products/ghe-sofa-mazie-28.jpg?v=1737082697853", url: "https://bizweb.dktcdn.net/thumb/large/100/361/830/products/ghe-sofa-mazie-28.jpg?v=1737082697853" },
        { id: 119, name: "Curved Sofa", price: 2800000, height: "87cm", width: "215cm", depth: "95cm", img: "https://media.admiddleeast.com/photos/65339a9f6446cd566befbe6e/16:9/w_2560%2Cc_limit/Vladimir%2520Kagan%2520Serpentine%2520Sofa%252C%2520www.hollyhunt.com%2520(3).jpg", url: "https://media.admiddleeast.com/photos/65339a9f6446cd566befbe6e/16:9/w_2560%2Cc_limit/Vladimir%2520Kagan%2520Serpentine%2520Sofa%252C%2520www.hollyhunt.com%2520(3).jpg" },
        { id: 120, name: "Hammock/Swing Sofa", price: 2900000, height: "80cm", width: "195cm", depth: "88cm", img: "https://limboimports.com/cdn/shop/products/junior-indoor-hammock-chair-limbo-imports-t.jpg?v=1740750666&width=1946", url: "https://limboimports.com/cdn/shop/products/junior-indoor-hammock-chair-limbo-imports-t.jpg?v=1740750666&width=1946" }
    ]
},
    {
    name: "Chairs",
    products: [
        { id: 121, name: "Armchair", price: 500000, height: "90cm", width: "80cm", depth: "85cm", img: "https://austinhomeinteriors.com/Data/Sites/1/Product/15395/key-armchair-2.jpg", url: "https://austinhomeinteriors.com/Data/Sites/1/Product/15395/key-armchair-2.jpg" },
        { id: 122, name: "Recliner Chair", price: 600000, height: "95cm", width: "85cm", depth: "90cm", img: "https://images-cdn.ubuy.co.in/65b44a659831b038ab5f42b7-tekamon-recliner-chair-leather-single.jpg", url: "https://images-cdn.ubuy.co.in/65b44a659831b038ab5f42b7-tekamon-recliner-chair-leather-single.jpg" },
        { id: 123, name: "Rocking Chair", price: 550000, height: "88cm", width: "75cm", depth: "85cm", img: "https://vermontwoodsstudios.com/cdn/shop/files/Quilted-Vermont-Rocking-Chair-Cherry.jpg?v=1744055320&width=1946", url: "https://vermontwoodsstudios.com/cdn/shop/files/Quilted-Vermont-Rocking-Chair-Cherry.jpg?v=1744055320&width=1946" },
        { id: 124, name: "Accent Chair", price: 520000, height: "86cm", width: "78cm", depth: "82cm", img: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/U34237s.jpg?im=Resize,width=750", url: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/U34237s.jpg?im=Resize,width=750" },
        { id: 125, name: "Club Chair", price: 580000, height: "90cm", width: "80cm", depth: "88cm", img: "https://www.georgesmith.com/us/wp-content/uploads/sites/2/2022/07/ChanneledClubChair_C851_GSMohairAuburn_CommuneCollection_566134ED_GeorgeSmith_02.jpg", url: "https://www.georgesmith.com/us/wp-content/uploads/sites/2/2022/07/ChanneledClubChair_C851_GSMohairAuburn_CommuneCollection_566134ED_GeorgeSmith_02.jpg" },
        { id: 126, name: "Barrel Chair", price: 570000, height: "85cm", width: "76cm", depth: "84cm", img: "https://hulalahome.com/cdn/shop/files/CHM0119-PINK_1.jpg?v=1743160064&width=1946", url: "https://hulalahome.com/cdn/shop/files/CHM0119-PINK_1.jpg?v=1743160064&width=1946" },
        { id: 127, name: "Wingback Chair", price: 620000, height: "92cm", width: "82cm", depth: "86cm", img: "https://adobeinteriors.com/image/catalog/living-room/accent-chairs/gentry-olive-wingback-chair-3.jpg", url: "https://adobeinteriors.com/image/catalog/living-room/accent-chairs/gentry-olive-wingback-chair-3.jpg" },
        { id: 128, name: "Slipper Chair", price: 510000, height: "84cm", width: "77cm", depth: "80cm", img: "https://assets.wfcdn.com/im/01466881/resize-h800-w800%5Ecompr-r85/2957/295717225/Alena+Linen+Slipper+Chair.jpg", url: "https://assets.wfcdn.com/im/01466881/resize-h800-w800%5Ecompr-r85/2957/295717225/Alena+Linen+Slipper+Chair.jpg" },
        { id: 129, name: "Parsons Chair", price: 530000, height: "83cm", width: "75cm", depth: "78cm", img: "https://assets.wfcdn.com/im/23518319/resize-h755-w755%5Ecompr-r85/1898/189848918/Abinaash+19.5%27%27+H+Upholstered+Parsons+Chair.jpg", url: "https://assets.wfcdn.com/im/23518319/resize-h755-w755%5Ecompr-r85/1898/189848918/Abinaash+19.5%27%27+H+Upholstered+Parsons+Chair.jpg" },
        { id: 130, name: "Chaise Lounge", price: 700000, height: "95cm", width: "160cm", depth: "75cm", img: "https://m.media-amazon.com/images/I/81-+LGEKCxL._AC_UF894,1000_QL80_.jpg", url: "https://m.media-amazon.com/images/I/81-+LGEKCxL._AC_UF894,1000_QL80_.jpg" },
        { id: 131, name: "Desk Chair", price: 540000, height: "87cm", width: "70cm", depth: "75cm", img: "https://ecvv.vn/cdn/shop/products/11_cd720c2b-9ff4-417e-a606-3e4b368d71e0_800x.jpg?v=1639726520", url: "https://ecvv.vn/cdn/shop/products/11_cd720c2b-9ff4-417e-a606-3e4b368d71e0_800x.jpg?v=1639726520" },
        { id: 132, name: "Dining Chair", price: 500000, height: "85cm", width: "60cm", depth: "65cm", img: "https://cdn.shopify.com/s/files/1/0418/9080/7961/files/HeathMochaVelvetDiningChairLone.jpg?v=1683796169", url: "https://cdn.shopify.com/s/files/1/0418/9080/7961/files/HeathMochaVelvetDiningChairLone.jpg?v=1683796169" },
        { id: 133, name: "Swivel Chair", price: 610000, height: "89cm", width: "78cm", depth: "80cm", img: "https://www.danetti.com/cdn/shop/products/NataliaLightGreyFabricLifestyleSide.jpg?v=1665481288", url: "https://www.danetti.com/cdn/shop/products/NataliaLightGreyFabricLifestyleSide.jpg?v=1665481288" },
        { id: 134, name: "Task Chair", price: 520000, height: "88cm", width: "68cm", depth: "72cm", img: "https://www.vari.com/dw/image/v2/BDFT_PRD/on/demandware.static/-/Sites-vari-master-catalog/default/dw5c9ea76c/images/large/ST-ESTTSKCHR/vari-essential-task-chair_st-esttsk_black.jpg?sw=800&sh=800", url: "https://www.vari.com/dw/image/v2/BDFT_PRD/on/demandware.static/-/Sites-vari-master-catalog/default/dw5c9ea76c/images/large/ST-ESTTSKCHR/vari-essential-task-chair_st-esttsk_black.jpg?sw=800&sh=800" },
        { id: 135, name: "Gaming Chair", price: 750000, height: "93cm", width: "70cm", depth: "78cm", img: "https://i5.walmartimages.com/seo/GTRACING-GTWD-200-Ergonomic-Gaming-Chair-with-Adjustable-Pillows-and-Footrest-White_43754c7c-2af5-46c4-8230-d7d14bc7d8b1.20bd7f61d36b5fb9177e86ae804c8b00.jpeg", url: "https://i5.walmartimages.com/seo/GTRACING-GTWD-200-Ergonomic-Gaming-Chair-with-Adjustable-Pillows-and-Footrest-White_43754c7c-2af5-46c4-8230-d7d14bc7d8b1.20bd7f61d36b5fb9177e86ae804c8b00.jpeg" },
        { id: 136, name: "Stacking Chair", price: 430000, height: "82cm", width: "60cm", depth: "65cm", img: "https://www.laura-james.co.uk/cdn/shop/products/paul-stackable-dining-chairs-set-of-2-white-laura-james-1.jpg?v=1713536329&width=1445", url: "https://www.laura-james.co.uk/cdn/shop/products/paul-stackable-dining-chairs-set-of-2-white-laura-james-1.jpg?v=1713536329&width=1445" },
        { id: 137, name: "Folding Chair", price: 420000, height: "80cm", width: "55cm", depth: "60cm", img: "https://images-na.ssl-images-amazon.com/images/I/61LVoAICJdL.jpg", url: "https://images-na.ssl-images-amazon.com/images/I/61LVoAICJdL.jpg" },
        { id: 138, name: "Plastic Chair", price: 400000, height: "81cm", width: "58cm", depth: "62cm", img: "https://shop.cosmoplast.com/cdn/shop/products/RegalChair266.3x266.3Pxl-02.jpg?v=1608027124", url: "https://shop.cosmoplast.com/cdn/shop/products/RegalChair266.3x266.3Pxl-02.jpg?v=1608027124" },
        { id: 139, name: "Wooden Chair", price: 480000, height: "85cm", width: "62cm", depth: "68cm", img: "https://devreugdedesign.com/wp-content/uploads/2024/11/2411-2-102-m27829-1960s-Thonet-chair-on-dark-wooden-base-with-webbing-seat-model-Charlie-Chaplin-Austria.jpg", url: "https://devreugdedesign.com/wp-content/uploads/2024/11/2411-2-102-m27829-1960s-Thonet-chair-on-dark-wooden-base-with-webbing-seat-model-Charlie-Chaplin-Austria.jpg" },
        { id: 140, name: "Metal Chair", price: 470000, height: "84cm", width: "61cm", depth: "66cm", img: "https://www.afw.com/images/thumbs/0153827_YD-440SIL_cb653_600.jpeg", url: "https://www.afw.com/images/thumbs/0153827_YD-440SIL_cb653_600.jpeg" }
    ]
},
{
    name: "Tables",
    products: [
        { id: 42, name: "Dining Table", price: 3000000, height: "75cm", width: "160cm", depth: "90cm", img: "https://cdn.media.amplience.net/i/boconcept/2f5d7cb5-3288-4e18-a195-ae6f00986f1d?w=3020&fmt=auto&upscale=false&sm=c&qlt=75&h=2265&%24auto-poi%24=", url: "https://cdn.media.amplience.net/i/boconcept/2f5d7cb5-3288-4e18-a195-ae6f00986f1d?w=3020&fmt=auto&upscale=false&sm=c&qlt=75&h=2265&%24auto-poi%24=" },
        { id: 43, name: "Coffee Table", price: 1500000, height: "45cm", width: "100cm", depth: "60cm", img: "https://mysleepyhead.com/media/catalog/product/s/l/sleepyhead_product_ls_309_new.jpg?auto=webp&format=pjpg&fit=cover", url: "https://mysleepyhead.com/media/catalog/product/s/l/sleepyhead_product_ls_309_new.jpg?auto=webp&format=pjpg&fit=cover" },
        { id: 44, name: "Side Table", price: 1000000, height: "55cm", width: "50cm", depth: "45cm", img: "https://kimfurniture.com/wp-content/uploads/2021/08/side-table-chieu-cao-ngang-sofa.jpg", url: "https://kimfurniture.com/wp-content/uploads/2021/08/side-table-chieu-cao-ngang-sofa.jpg" },
        { id: 45, name: "Console Table", price: 1700000, height: "80cm", width: "120cm", depth: "40cm", img: "https://i5.walmartimages.com/seo/Surmoby-Rattan-Console-Table-2-Drawers-Boho-Wood-Entryway-Table-Hallway-Table-Open-Storage-Shelf-Narrow-Sofa-Table-Foyer-Living-Room-Corridor-Oak-2PC_05da1ba3-a172-4485-aa90-11c9476b5b1d.a49cb31ad0c545a545d40b4e669357d7.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF", url: "https://i5.walmartimages.com/seo/Surmoby-Rattan-Console-Table-2-Drawers-Boho-Wood-Entryway-Table-Hallway-Table-Open-Storage-Shelf-Narrow-Sofa-Table-Foyer-Living-Room-Corridor-Oak-2PC_05da1ba3-a172-4485-aa90-11c9476b5b1d.a49cb31ad0c545a545d40b4e669357d7.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF" },
        { id: 46, name: "Study Table", price: 2500000, height: "75cm", width: "140cm", depth: "70cm", img: "https://www.zorin.co.in/cdn/shop/products/ST-4_liftstyle.jpg?v=1654513893&width=2100", url: "https://www.zorin.co.in/cdn/shop/products/ST-4_liftstyle.jpg?v=1654513893&width=2100" },
        { id: 47, name: "Computer Table", price: 2200000, height: "75cm", width: "130cm", depth: "65cm", img: "https://m.media-amazon.com/images/I/81GBoZTQ9dL._AC_UF894,1000_QL80_.jpg", url: "https://m.media-amazon.com/images/I/81GBoZTQ9dL._AC_UF894,1000_QL80_.jpg" },
        { id: 48, name: "Bedside Table", price: 800000, height: "50cm", width: "45cm", depth: "40cm", img: "https://www.daals.co.uk/cdn/shop/files/XXNS-021-NAT_main.jpg?v=1718435864", url: "https://www.daals.co.uk/cdn/shop/files/XXNS-021-NAT_main.jpg?v=1718435864" },
        { id: 49, name: "Folding Table", price: 900000, height: "72cm", width: "120cm", depth: "70cm", img: "https://www.vkf-renzel.com/out/pictures/generated/product/1/1000_1000_75/r6600321-01/folding-table-mini-66.0032.1-1.jpg", url: "https://www.vkf-renzel.com/out/pictures/generated/product/1/1000_1000_75/r6600321-01/folding-table-mini-66.0032.1-1.jpg" },
        { id: 50, name: "Bar Table", price: 1800000, height: "110cm", width: "60cm", depth: "60cm", img: "https://tribesigns.com/cdn/shop/files/63-bar-table-rectangular-high-top-kitchen-dining-tableonly-table-209124.jpg?v=1734410470&width=2048", url: "https://tribesigns.com/cdn/shop/files/63-bar-table-rectangular-high-top-kitchen-dining-tableonly-table-209124.jpg?v=1734410470&width=2048" },
        { id: 51, name: "Nested Tables", price: 1600000, height: "45cm", width: "100cm", depth: "60cm", img: "https://www.kenro.co.uk/cdn/shop/files/RoundTable_0492__web.jpg?v=1709303843", url: "https://www.kenro.co.uk/cdn/shop/files/RoundTable_0492__web.jpg?v=1709303843" },
        { id: 52, name: "Round Table", price: 2800000, height: "75cm", width: "120cm", depth: "120cm", img: "https://assets.weimgs.com/weimgs/rk/images/wcm/products/202511/0002/ellington-round-dining-table-48-o.jpg", url: "https://assets.weimgs.com/weimgs/rk/images/wcm/products/202511/0002/ellington-round-dining-table-48-o.jpg" },
        { id: 53, name: "Square Table", price: 2500000, height: "75cm", width: "100cm", depth: "100cm", img: "https://tribesigns.com/cdn/shop/products/394-square-dining-table-kitchen-table-with-solid-wood-legs-for-4-832615.jpg?v=1704724887", url: "https://tribesigns.com/cdn/shop/products/394-square-dining-table-kitchen-table-with-solid-wood-legs-for-4-832615.jpg?v=1704724887" },
        { id: 54, name: "Extendable Table", price: 3500000, height: "75cm", width: "160cm", depth: "90cm", img: "https://m.media-amazon.com/images/I/813Mg6ZcedL.jpg", url: "https://m.media-amazon.com/images/I/813Mg6ZcedL.jpg" },
        { id: 55, name: "Drop-leaf Table", price: 2700000, height: "75cm", width: "150cm", depth: "85cm", img: "https://images2.imgix.net/p4dbimg/501/images/potsp6100product.jpg?trim=color&trimtol=5&trimcolor=FFFFFF&dl=POTSP6100.jpg&fm=jpg", url: "https://images2.imgix.net/p4dbimg/501/images/potsp6100product.jpg?trim=color&trimtol=5&trimcolor=FFFFFF&dl=POTSP6100.jpg&fm=jpg" },
        { id: 56, name: "Work Table", price: 2000000, height: "76cm", width: "150cm", depth: "80cm", img: "https://arcrestaurantequipment.com/wp-content/uploads/2023/01/vtt-7230_0.jpg", url: "https://arcrestaurantequipment.com/wp-content/uploads/2023/01/vtt-7230_0.jpg" },
        { id: 57, name: "Game Table", price: 2200000, height: "76cm", width: "120cm", depth: "80cm", img: "https://www.dallasdesignerfurniture.com/images/SteveSilverRL500RyliePokerTableSetBlack.jpg", url: "https://www.dallasdesignerfurniture.com/images/SteveSilverRL500RyliePokerTableSetBlack.jpg" },
        { id: 58, name: "Vanity Table", price: 1900000, height: "75cm", width: "100cm", depth: "50cm", img: "https://i5.walmartimages.com/seo/Boahaus-Artemisia-Modern-Vanity-Table-with-Mirror-White-Finish-for-Bedroom_4e8764eb-a7b1-4667-ae30-4ade9312c9ff.cbd068ff56bed1c1da8017720848976d.jpeg", url: "https://i5.walmartimages.com/seo/Boahaus-Artemisia-Modern-Vanity-Table-with-Mirror-White-Finish-for-Bedroom_4e8764eb-a7b1-4667-ae30-4ade9312c9ff.cbd068ff56bed1c1da8017720848976d.jpeg" },
        { id: 59, name: "Glass Table", price: 2400000, height: "74cm", width: "130cm", depth: "70cm", img: "https://www.woods-furniture.co.uk/images/products/large/8525_5063.jpg", url: "https://www.woods-furniture.co.uk/images/products/large/8525_5063.jpg" },
        { id: 60, name: "Picnic Table", price: 2100000, height: "72cm", width: "180cm", depth: "75cm", img: "https://i5.walmartimages.com/seo/Costway-Picnic-Table-Bench-Set-Outdoor-Backyard-Iron-Patio-Garden-Party-Dining-All-Weather-Black_36309c81-6426-4394-99ad-b79401fe076c.432374672d36145dc9c967df4e27fd25.jpeg", url: "https://i5.walmartimages.com/seo/Costway-Picnic-Table-Bench-Set-Outdoor-Backyard-Iron-Patio-Garden-Party-Dining-All-Weather-Black_36309c81-6426-4394-99ad-b79401fe076c.432374672d36145dc9c967df4e27fd25.jpeg" }
    ]
},
{
    name: "TV",
    products: [
        { id: 22, name: "LED TV", price: 5000000, height: "45cm", width: "80cm", depth: "8cm", img: "https://bizweb.dktcdn.net/100/384/458/files/mat-truoc-k50u7.jpg?v=1642476188766", url: "https://bizweb.dktcdn.net/100/384/458/files/mat-truoc-k50u7.jpg?v=1642476188766" },
        { id: 23, name: "OLED TV", price: 15000000, height: "45cm", width: "85cm", depth: "5cm", img: "https://bizweb.dktcdn.net/100/439/998/products/smart-tivi-oled-lg-4k-65-inch-65c3psa-1.jpg?v=1711077692620", url: "https://bizweb.dktcdn.net/100/439/998/products/smart-tivi-oled-lg-4k-65-inch-65c3psa-1.jpg?v=1711077692620" },
        { id: 24, name: "QLED TV", price: 12000000, height: "50cm", width: "90cm", depth: "6cm", img: "https://images.samsung.com/is/image/samsung/p6pim/vn/qa65q70dakxxv/gallery/vn-qled-tv-qa65q70dakxxv-m-t-tr--c-542467599?$684_547_PNG$", url: "https://images.samsung.com/is/image/samsung/p6pim/vn/qa65q70dakxxv/gallery/vn-qled-tv-qa65q70dakxxv-m-t-tr--c-542467599?$684_547_PNG$" },
        { id: 25, name: "LCD TV", price: 4000000, height: "45cm", width: "75cm", depth: "9cm", img: "https://cdn.tgdd.vn/Files/2015/10/17/722391/tivi-led-va-tivi-lcd-co-gi-khac-biet-9.jpg", url: "https://cdn.tgdd.vn/Files/2015/10/17/722391/tivi-led-va-tivi-lcd-co-gi-khac-biet-9.jpg" },
        { id: 26, name: "Smart TV", price: 7000000, height: "47cm", width: "82cm", depth: "6cm", img: "https://cdn.mediamart.vn/images/product/smart-tivi-coex-4k-50-inch-50ut7000yg-google-tv_64dd2bae.webp", url: "https://cdn.mediamart.vn/images/product/smart-tivi-coex-4k-50-inch-50ut7000yg-google-tv_64dd2bae.webp" },
        { id: 27, name: "4K TV", price: 9000000, height: "48cm", width: "85cm", depth: "7cm", img: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_11_22_638362440473151163_tivi-4k-uhd-thumb.jpg", url: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_11_22_638362440473151163_tivi-4k-uhd-thumb.jpg" },
        { id: 28, name: "8K TV", price: 25000000, height: "50cm", width: "88cm", depth: "7cm", img: "https://bepxanh.com/Uploads/smart-tivi-neo-qled-8k-55-inch-samsung-qa55qn700a.jpg", url: "https://bepxanh.com/Uploads/smart-tivi-neo-qled-8k-55-inch-samsung-qa55qn700a.jpg" },
        { id: 29, name: "Curved TV", price: 10000000, height: "49cm", width: "86cm", depth: "8cm", img: "https://sieuthimaylanh.com/uploads/tivi/04_2021/smart-tivi-cong-samsung-4k-49-inch-ua49ru7300-6.webp", url: "https://sieuthimaylanh.com/uploads/tivi/04_2021/smart-tivi-cong-samsung-4k-49-inch-ua49ru7300-6.webp" },
        { id: 30, name: "Mini-LED TV", price: 13000000, height: "46cm", width: "83cm", depth: "5cm", img: "https://tongkhodienmaymienbac.com/wp-content/uploads/2024/09/65xr70-1.jpg", url: "https://tongkhodienmaymienbac.com/wp-content/uploads/2024/09/65xr70-1.jpg" },
        { id: 31, name: "Portable TV", price: 3000000, height: "30cm", width: "50cm", depth: "5cm", img: "https://i5.walmartimages.com/asr/ab6e419d-dff1-4bc2-9e2e-9947f4e1e7dd.a0a65e5c280e2311944b1f5577adf9b7.png", url: "https://i5.walmartimages.com/asr/ab6e419d-dff1-4bc2-9e2e-9947f4e1e7dd.a0a65e5c280e2311944b1f5577adf9b7.png" },
        { id: 32, name: "Plasma TV", price: 6000000, height: "48cm", width: "78cm", depth: "12cm", img: "https://static.retailworldvn.com/News/0/Plasma-TV3-845x442.jpg", url: "https://static.retailworldvn.com/News/0/Plasma-TV3-845x442.jpg" },
        { id: 33, name: "Mirror TV", price: 20000000, height: "55cm", width: "90cm", depth: "6cm", img: "https://seura.com/cdn/shop/files/42x48-32.jpg?v=1717024164&width=1445", url: "https://seura.com/cdn/shop/files/42x48-32.jpg?v=1717024164&width=1445" },
        { id: 34, name: "Projector TV", price: 8000000, height: "12cm", width: "30cm", depth: "25cm", img: "https://image.benq.com/is/image/benqco/Key%20Visual(1200x675)?$ResponsivePreset$&fmt=png-alpha", url: "https://image.benq.com/is/image/benqco/Key%20Visual(1200x675)?$ResponsivePreset$&fmt=png-alpha" },
        { id: 35, name: "Commercial Display TV", price: 11000000, height: "60cm", width: "100cm", depth: "10cm", img: "https://res.cloudinary.com/dbihouiij/image/upload/c_scale,dpr_auto,f_auto,w_auto/v1/SiteImages/0000204_49-4k-uhd-digital-signage-display-247-operation", url: "https://res.cloudinary.com/dbihouiij/image/upload/c_scale,dpr_auto,f_auto,w_auto/v1/SiteImages/0000204_49-4k-uhd-digital-signage-display-247-operation" },
        { id: 36, name: "Touchscreen TV", price: 16000000, height: "50cm", width: "90cm", depth: "7cm", img: "https://www.corneaworld.com/cdn/shop/files/Image_2_29813d36-ffe5-4b71-8ca6-7a811ac09474.jpg?v=1711710343", url: "https://www.corneaworld.com/cdn/shop/files/Image_2_29813d36-ffe5-4b71-8ca6-7a811ac09474.jpg?v=1711710343" },
        { id: 37, name: "CRT TV", price: 2000000, height: "55cm", width: "70cm", depth: "45cm", img: "https://cdn.tgdd.vn/Files/2018/10/17/1125094/tivi-crt-la-gi-nguyen-ly-hoat-dong-uu-va-nhuoc-diem-cua-tivi-man-hinh-crt.jpg", url: "https://cdn.tgdd.vn/Files/2018/10/17/1125094/tivi-crt-la-gi-nguyen-ly-hoat-dong-uu-va-nhuoc-diem-cua-tivi-man-hinh-crt.jpg" },
        { id: 38, name: "Full HD TV", price: 6000000, height: "45cm", width: "80cm", depth: "7cm", img: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Mtsp/tivi/smart-tivi-tcl-full-hd-43-inch-43s5400a.jpg", url: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Mtsp/tivi/smart-tivi-tcl-full-hd-43-inch-43s5400a.jpg" },
        { id: 39, name: "Outdoor TV", price: 17000000, height: "50cm", width: "85cm", depth: "9cm", img: "https://shopgdlf.com/cdn/shop/files/07_db2826e9-9558-47da-b3fc-7d383ef8509a_1024x1024@2x.jpg?v=1724356849", url: "https://shopgdlf.com/cdn/shop/files/07_db2826e9-9558-47da-b3fc-7d383ef8509a_1024x1024@2x.jpg?v=1724356849" },
        { id: 40, name: "3D TV", price: 10000000, height: "48cm", width: "84cm", depth: "6cm", img: "https://cdnv2.tgdd.vn/mwg-static/common/News/577507/tivi-3d-la-gi-1.jpg", url: "https://cdnv2.tgdd.vn/mwg-static/common/News/577507/tivi-3d-la-gi-1.jpg" },
        { id: 41, name: "Smart 4K OLED TV", price: 18000000, height: "49cm", width: "88cm", depth: "6cm", img: "https://cdn.mediamart.vn/images/product/smart-tivi-lg-oled-4k-65-inch-oled65c4psa_30b53bab.webp", url: "https://cdn.mediamart.vn/images/product/smart-tivi-lg-oled-4k-65-inch-oled65c4psa_30b53bab.webp" }
    ]
},

    {
      name: "Wardrobes",
      products: [
        { id: 61, name: "Sliding Door Wardrobe", price: 5500000, height: "200cm", width: "160cm", depth: "60cm", img: "https://www.oakworld.co.uk/wp-content/uploads/2021/09/ARTI-AR-02-WM.jpg", url: "https://www.oakworld.co.uk/wp-content/uploads/2021/09/ARTI-AR-02-WM.jpg" },
        { id: 62, name: "Hinged Door Wardrobe", price: 5200000, height: "210cm", width: "170cm", depth: "60cm", img: "https://www.ormedesign.it/wp-content/uploads/2020/10/armadio-battente-con-anta-liscia-e-maniglia-m36-1-orme.jpg", url: "https://www.ormedesign.it/wp-content/uploads/2020/10/armadio-battente-con-anta-liscia-e-maniglia-m36-1-orme.jpg" },
        { id: 63, name: "Walk-in Wardrobe", price: 20000000, height: "250cm", width: "300cm", depth: "150cm", img: "https://cdn.shopify.com/s/files/1/1376/0721/files/wardrobe2.jpg?v=1524682053", url: "https://cdn.shopify.com/s/files/1/1376/0721/files/wardrobe2.jpg?v=1524682053" },
        { id: 64, name: "Free-standing Wardrobe", price: 4800000, height: "190cm", width: "150cm", depth: "55cm", img: "https://m.media-amazon.com/images/I/7169Sdfe4gL._AC_SL1200_.jpg", url: "https://m.media-amazon.com/images/I/7169Sdfe4gL._AC_SL1200_.jpg" },
        { id: 65, name: "Built-in Wardrobe", price: 15000000, height: "230cm", width: "260cm", depth: "65cm", img: "https://cornishcabinet.com/wp-content/uploads/2024/04/bedroom_wardrobes.webp", url: "https://cornishcabinet.com/wp-content/uploads/2024/04/bedroom_wardrobes.webp" },
        { id: 66, name: "Mirrored Wardrobe", price: 6000000, height: "210cm", width: "170cm", depth: "60cm", img: "https://i.pinimg.com/originals/da/64/c0/da64c0ef5b3104424a85edd77df0551d.jpg", url: "https://i.pinimg.com/originals/da/64/c0/da64c0ef5b3104424a85edd77df0551d.jpg" },
        { id: 67, name: "Open Wardrobe", price: 3500000, height: "185cm", width: "130cm", depth: "55cm", img: "https://www.oakworld.co.uk/wp-content/uploads/2021/04/TAD338.jpg", url: "https://www.oakworld.co.uk/wp-content/uploads/2021/04/TAD338.jpg" },
        { id: 68, name: "Corner Wardrobe", price: 5000000, height: "200cm", width: "160cm", depth: "70cm", img: "https://www.ikea.com/ph/en/images/products/pax-corner-wardrobe-white__0780638_pe760145_s5.jpg?f=s", url: "https://www.ikea.com/ph/en/images/products/pax-corner-wardrobe-white__0780638_pe760145_s5.jpg?f=s" },
        { id: 69, name: "Single Door Wardrobe", price: 3000000, height: "180cm", width: "90cm", depth: "55cm", img: "https://i.pinimg.com/564x/92/ca/78/92ca7842e32c3a613b09a9dfdae50a44.jpg", url: "https://i.pinimg.com/564x/92/ca/78/92ca7842e32c3a613b09a9dfdae50a44.jpg" },
        { id: 70, name: "Double Door Wardrobe", price: 4500000, height: "190cm", width: "120cm", depth: "60cm", img: "https://m.media-amazon.com/images/I/81SVeR0I2wL.jpg", url: "https://m.media-amazon.com/images/I/81SVeR0I2wL.jpg" },
        { id: 71, name: "Triple Door Wardrobe", price: 5800000, height: "200cm", width: "160cm", depth: "60cm", img: "https://www.hometown.in/cdn/shop/files/1_73f18ac9-9f26-42fb-98cd-c3b0067da2c0.jpg?v=1744375885", url: "https://www.hometown.in/cdn/shop/files/1_73f18ac9-9f26-42fb-98cd-c3b0067da2c0.jpg?v=1744375885" },
        { id: 72, name: "Modular Wardrobe", price: 7000000, height: "210cm", width: "170cm", depth: "65cm", img: "https://productimages.withfloats.com/actual/65c24af5e24ac012cb17590d.jpg", url: "https://productimages.withfloats.com/actual/65c24af5e24ac012cb17590d.jpg" },
        { id: 73, name: "Sliding Mirror Wardrobe", price: 6200000, height: "210cm", width: "170cm", depth: "60cm", img: "https://files.ekmcdn.com/ronzfurniture/images/memphis-240cm-full-mirrored-extra-large-sliding-door-wardrobe-white-p8ikmlbl-12584-p.jpg", url: "https://files.ekmcdn.com/ronzfurniture/images/memphis-240cm-full-mirrored-extra-large-sliding-door-wardrobe-white-p8ikmlbl-12584-p.jpg" },
        { id: 74, name: "Loft Wardrobe", price: 8000000, height: "240cm", width: "200cm", depth: "70cm", img: "https://mrwardrobe.co.uk/wp-content/uploads/2023/06/fitted-loft-wardrobe_MrWardrobe_0001-scaled.jpg", url: "https://mrwardrobe.co.uk/wp-content/uploads/2023/06/fitted-loft-wardrobe_MrWardrobe_0001-scaled.jpg" },
        { id: 75, name: "Kids' Wardrobe", price: 3200000, height: "160cm", width: "100cm", depth: "50cm", img: "https://www.rafa-kids.com/wp-content/uploads/2019/03/Rafa-kids-H-wardrobe-for-children01.jpg", url: "https://www.rafa-kids.com/wp-content/uploads/2019/03/Rafa-kids-H-wardrobe-for-children01.jpg" },
        { id: 76, name: "Minimalist Wardrobe", price: 5000000, height: "200cm", width: "150cm", depth: "55cm", img: "https://minimalism.co/wp-content/uploads/2018/06/Minimalist-Wardobe-Featured-Image.jpg", url: "https://minimalism.co/wp-content/uploads/2018/06/Minimalist-Wardobe-Featured-Image.jpg" },
        { id: 77, name: "Rustic Wardrobe", price: 5500000, height: "210cm", width: "160cm", depth: "60cm", img: "https://www.happybeds.co.uk/cdn-cgi/image/fit=contain,q=75,f=auto,width=1000/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/F/6/F603123D077CB0FC0E54DF8B77D5803A.jpg", url: "https://www.happybeds.co.uk/cdn-cgi/image/fit=contain,q=75,f=auto,width=1000/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/F/6/F603123D077CB0FC0E54DF8B77D5803A.jpg" },
        { id: 78, name: "Industrial Wardrobe", price: 6000000, height: "210cm", width: "160cm", depth: "65cm", img: "https://modernindustrialfurniture.com/cdn/shop/products/IMG_0106-SQ_Large_94b9ea7c-27f8-49e7-92ba-9208cdc5feae.jpg?v=1675402697", url: "https://modernindustrialfurniture.com/cdn/shop/products/IMG_0106-SQ_Large_94b9ea7c-27f8-49e7-92ba-9208cdc5feae.jpg?v=1675402697" },
        { id: 79, name: "Vintage Wardrobe", price: 7000000, height: "220cm", width: "180cm", depth: "70cm", img: "https://files.melodymaison.co.uk/images/P/antique-white-mirrored-double-wardrobe-pays-blanc-range_MM23845-02.jpg", url: "https://files.melodymaison.co.uk/images/P/antique-white-mirrored-double-wardrobe-pays-blanc-range_MM23845-02.jpg" },
        { id: 80, name: "Smart Wardrobe", price: 10000000, height: "220cm", width: "190cm", depth: "70cm", img: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9b600248847769.58a3b2fdaa294.png", url: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9b600248847769.58a3b2fdaa294.png" }
      ]
},
    {
      name: "Cabinets",
      products: [
        { id: 81, name: "Kitchen Cabinet", price: 2500000, height: "80cm", width: "100cm", depth: "60cm", img: "https://furniture.ug/wp-content/uploads/2025/01/Modern-Grey-Kitchen-Cabinet.jpg", url: "https://furniture.ug/wp-content/uploads/2025/01/Modern-Grey-Kitchen-Cabinet.jpg" },
        { id: 82, name: "Wall Cabinet", price: 1800000, height: "60cm", width: "80cm", depth: "35cm", img: "https://files.melodymaison.co.uk/images/P/large-black-white-glass-fronted-wall-cabinet-90cm-x-70cm_MM34439.jpg", url: "https://files.melodymaison.co.uk/images/P/large-black-white-glass-fronted-wall-cabinet-90cm-x-70cm_MM34439.jpg" },
        { id: 83, name: "Base Cabinet", price: 2200000, height: "85cm", width: "90cm", depth: "60cm", img: "https://images.thdstatic.com/productImages/70fbb0c9-a4b7-4b77-81e7-395e86f80707/svn/painted-stratus-assembled-kitchen-cabinets-sb27b-rockingham-stratus-64_600.jpg", url: "https://images.thdstatic.com/productImages/70fbb0c9-a4b7-4b77-81e7-395e86f80707/svn/painted-stratus-assembled-kitchen-cabinets-sb27b-rockingham-stratus-64_600.jpg" },
        { id: 84, name: "Tall Cabinet", price: 3500000, height: "200cm", width: "70cm", depth: "60cm", img: "https://m.media-amazon.com/images/I/71LYNzwWcML.jpg", url: "https://m.media-amazon.com/images/I/71LYNzwWcML.jpg" },
        { id: 85, name: "Bathroom Cabinet", price: 1500000, height: "75cm", width: "65cm", depth: "45cm", img: "https://wgassets.duravit.cloud/photomanager-duravit/file/8a8a818d80dc6dd70180e0ce35602be5/ketho2_semi-tall_cabinet_open.jpg?derivate=width~1920", url: "https://wgassets.duravit.cloud/photomanager-duravit/file/8a8a818d80dc6dd70180e0ce35602be5/ketho2_semi-tall_cabinet_open.jpg?derivate=width~1920" },
        { id: 86, name: "Vanity Cabinet", price: 2800000, height: "80cm", width: "100cm", depth: "50cm", img: "https://m.media-amazon.com/images/I/811QGhIgFGL.jpg", url: "https://m.media-amazon.com/images/I/811QGhIgFGL.jpg" },
        { id: 87, name: "Corner Cabinet", price: 2400000, height: "90cm", width: "90cm", depth: "65cm", img: "https://m.media-amazon.com/images/I/81Vsi+oyEkL.jpg", url: "https://m.media-amazon.com/images/I/81Vsi+oyEkL.jpg" },
        { id: 88, name: "TV Cabinet", price: 3000000, height: "60cm", width: "150cm", depth: "45cm", img: "https://www.theblockshop.com.au/media/catalog/product/a/s/ashley-white-wooden-tv-cabinet-entertainment-unit-180cm-285785.jpg?quality=80&fit=bounds&height=648&width=648&canvas=648:648", url: "https://www.theblockshop.com.au/media/catalog/product/a/s/ashley-white-wooden-tv-cabinet-entertainment-unit-180cm-285785.jpg?quality=80&fit=bounds&height=648&width=648&canvas=648:648" },
        { id: 89, name: "Filing Cabinet", price: 1900000, height: "100cm", width: "45cm", depth: "60cm", img: "https://m.media-amazon.com/images/I/6132EWEvZ+L._AC_UF894,1000_QL80_.jpg", url: "https://m.media-amazon.com/images/I/6132EWEvZ+L._AC_UF894,1000_QL80_.jpg" },
        { id: 90, name: "Storage Cabinet", price: 2000000, height: "120cm", width: "90cm", depth: "60cm", img: "https://assets.wfcdn.com/im/41908324/compr-r85/2899/289995608/Jussiah+Storage+Cabinet+with+4+Doors+%26+Adjustable+Shelf.jpg", url: "https://assets.wfcdn.com/im/41908324/compr-r85/2899/289995608/Jussiah+Storage+Cabinet+with+4+Doors+%26+Adjustable+Shelf.jpg" },
        { id: 91, name: "Medicine Cabinet", price: 1300000, height: "60cm", width: "50cm", depth: "20cm", img: "https://images-na.ssl-images-amazon.com/images/I/71fcJnfuPXL.jpg", url: "https://images-na.ssl-images-amazon.com/images/I/71fcJnfuPXL.jpg" },
        { id: 92, name: "Display Cabinet", price: 3200000, height: "180cm", width: "90cm", depth: "40cm", img: "https://m.media-amazon.com/images/I/71RpF+VNvpL.jpg", url: "https://m.media-amazon.com/images/I/71RpF+VNvpL.jpg" },
        { id: 93, name: "Wardrobe Cabinet", price: 4000000, height: "190cm", width: "100cm", depth: "55cm", img: "https://m.media-amazon.com/images/I/712i2n2h5+L._AC_UF894,1000_QL80_.jpg", url: "https://m.media-amazon.com/images/I/712i2n2h5+L._AC_UF894,1000_QL80_.jpg" },
        { id: 94, name: "Shoe Cabinet", price: 1700000, height: "110cm", width: "80cm", depth: "35cm", img: "https://tribesigns.com/cdn/shop/products/walnut-shoe-cabinet-6-tier-wooden-shoe-organizer-with-adjustable-shelves-770650.jpg?v=1704550552", url: "https://tribesigns.com/cdn/shop/products/walnut-shoe-cabinet-6-tier-wooden-shoe-organizer-with-adjustable-shelves-770650.jpg?v=1704550552" },
        { id: 95, name: "Laundry Cabinet", price: 2500000, height: "170cm", width: "90cm", depth: "50cm", img: "https://m.media-amazon.com/images/I/716yIUxD0jL.jpg", url: "https://m.media-amazon.com/images/I/716yIUxD0jL.jpg" },
        { id: 96, name: "Utility Cabinet", price: 2600000, height: "180cm", width: "85cm", depth: "55cm", img: "https://www.homecrestcabinetry.com/file/media/homecrest/products/cabinet_interiors/utilityrolltrayrosedapticbs.jpg", url: "https://www.homecrestcabinetry.com/file/media/homecrest/products/cabinet_interiors/utilityrolltrayrosedapticbs.jpg" },
        { id: 97, name: "Bookcase Cabinet", price: 3000000, height: "190cm", width: "100cm", depth: "40cm", img: "https://assets.wfcdn.com/im/69748708/compr-r85/2906/290687990/Bookcase+With+File+Cabinet+Drawers.jpg", url: "https://assets.wfcdn.com/im/69748708/compr-r85/2906/290687990/Bookcase+With+File+Cabinet+Drawers.jpg" },
        { id: 98, name: "Bar Cabinet", price: 3500000, height: "150cm", width: "90cm", depth: "45cm", img: "https://www.stickley.com/cdn/shop/products/8227-BAR_Lifestyle1.jpg?v=1650588491&width=1946", url: "https://www.stickley.com/cdn/shop/products/8227-BAR_Lifestyle1.jpg?v=1650588491&width=1946" },
        { id: 99, name: "Buffet Cabinet", price: 4000000, height: "90cm", width: "160cm", depth: "50cm", img: "https://images-na.ssl-images-amazon.com/images/I/815WioueKWL.jpg", url: "https://images-na.ssl-images-amazon.com/images/I/815WioueKWL.jpg" },
        { id: 100, name: "Lockable Cabinet", price: 2800000, height: "150cm", width: "80cm", depth: "40cm", img: "https://orderofficefurniture.co.uk/cdn/shop/products/black_3_1.jpg?v=1690450747", url: "https://orderofficefurniture.co.uk/cdn/shop/products/black_3_1.jpg?v=1690450747" }
      ]
    }
];
/* Removed invalid line that caused ReferenceError: sofas is not defined */
// sofas,cabinets,Wardrobes,tables,TVs,Beds
var cart = [];

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    console.log("Loading cart from storage:", storedCart);
    if (storedCart) {
        cart = JSON.parse(storedCart);
    } else {
        cart = [];
    }
    const cartCountElem = document.getElementById("cartCount");
    if (cartCountElem) {
        cartCountElem.innerText = cart.length;
    } else {
        console.warn("cartCount element not found");
    }
}

function addToCart(productId) {
    let product = null;

    // Find the product by ID
    for (const category of categories) {
        for (const p of category.products) {
            if (p.id === productId) {
                product = p;
                break;
            }
        }
        if (product) break;
    }

    if (product) {
        // Load existing cart from localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Add the new product
        cart.push(product);

        // Save updated cart
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update cart count in the UI
        document.getElementById("cartCount").innerText = cart.length;

        alert(`${product.name} đã được thêm vào giỏ hàng!`);
    } else {
        alert("Sản phẩm không tồn tại!");
    }
}


window.onload = () => {
    loadCartFromStorage();
    loadPopularProducts();
    loadNewProducts();
    loadFeaturedProducts();
    // loadCategories(); // Removed to prevent clearing product sections
    // searchProduct(); // Removed to prevent clearing product sections

    // Define popular products to exclude from submenu
    const popularProductNames = ["Iphone 15 pro max", "ps5", "neoprene dumbbell", "kalpen vacuum cleaner", "JBL quantum 800"];

    // Disabled submenu generation to remove hover submenu functionality
    /*
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(button => {
        const categoryName = button.getAttribute("data-category-name");
        const submenu = button.querySelector(".submenu");
        submenu.innerHTML = ""; // Clear existing submenu items

        // Find the category in categories array
        const category = categories.find(cat => cat.name === categoryName);
        if (category && category.products && category.products.length > 0) {
            const submenuList = document.createElement("ul");
            submenuList.classList.add("submenu-list");

            function addSubmenuItem(product) {
                const submenuItem = document.createElement("li");
                const link = document.createElement("a");
                link.textContent = product.name;
                link.href = product.url || "#";
                link.style.cursor = "pointer";
                submenuItem.appendChild(link);
                submenuList.appendChild(submenuItem);
            }

            if (categoryName === "Beds") {
                // Exclude specific products and add "Smartphone" instead (remove iphone 15 pro max)
                category.products.forEach(product => {
                    if (!["Samsung galaxy", "MacBook Pro", "iPhone 14", "Iphone 15 pro max"].includes(product.name)) {
                        addSubmenuItem(product);
                    }
                });
                const smartphoneItem = document.createElement("li");
                const smartphoneLink = document.createElement("a");
                smartphoneLink.textContent = "Smartphone";
                smartphoneLink.href = "#"; // Placeholder URL
                smartphoneLink.style.cursor = "pointer";
                smartphoneItem.appendChild(smartphoneLink);
                submenuList.appendChild(smartphoneItem);
            } else {
                category.products.forEach(product => {
                    if (!popularProductNames.includes(product.name)) {
                        addSubmenuItem(product);
                    }
                });
            }

            submenu.appendChild(submenuList);
        }
    });
    */

    // Dropdown hover delay logic
    let dropdownTimer = null;

    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.querySelector('.user-menu .dropdown');

    if (userMenu && dropdown) {
        // Ensure click on user icon toggles dropdown visibility
        const userIcon = userMenu.querySelector('.user-icon');
        if (userIcon) {
            userIcon.removeEventListener('click', () => {}); // Remove any previous empty listeners
            userIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                } else {
                    dropdown.classList.add('show');
                }
            });
        }

        // Mouse leave on dropdown hides it immediately
        dropdown.addEventListener('mouseleave', () => {
            dropdown.classList.remove('show');
        });

        // Remove CSS hover effect by removing the hover style class
        // We will remove the CSS rule '.user-menu:hover .dropdown' by overriding it here
        const styleSheet = document.styleSheets[0];
        for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
            const rule = styleSheet.cssRules[i];
            if (rule.selectorText === '.user-menu:hover .dropdown') {
                styleSheet.deleteRule(i);
            }
        }
    }
};
let currentCategory = "All Products";

function loadCategories(filterCategory = "All Products") {
    let categoryContainer = document.getElementById("categories");
    categoryContainer.innerHTML = "";
    // Do not render any categories to remove them from main page
}


function searchProduct() {
    let query = document.getElementById("searchBox").value.toLowerCase().trim();
    let categoryContainer = document.getElementById("categories");
    categoryContainer.innerHTML = "";

    console.log("Search query:", query);

    if (!query) {
        // If search box is empty, show all categories and products
        categories.forEach(category => {
            let categoryHTML = `
                <div class="category">
                    <h2>${category.name}</h2>
                    <div class="products">
                        ${category.products.map(product => `
                            <div class="product">
                                <img src="${product.img}" alt="${product.name}">
                                <h3>${product.name}</h3>
                                <p>${product.price.toLocaleString()} VND</p>
                                <p>Height: ${product.height}</p>
                                <p>Width: ${product.width}</p>
                                <p>Depth: ${product.depth}</p>
                                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to cart</button>
                            </div>
                        `).join("")}
                    </div>
                </div>
            `;
            categoryContainer.innerHTML += categoryHTML;
        });
        return;
    }

    let filteredCategories = categories.map(category => ({
        name: category.name,
        products: category.products.filter(p => p.name.toLowerCase().includes(query))
    })).filter(category => category.products.length > 0);

    console.log("Filtered categories:", filteredCategories);

    if (filteredCategories.length === 0) {
        categoryContainer.innerHTML = "<p style='text-align:center;'>No products found</p>";
        return;
    }

    filteredCategories.forEach(category => {
        let categoryHTML = `
            <div class="category">
                <h2>${category.name}</h2>
                <div class="products">
                    ${category.products.map(product => `
                        <div class="product">
                            <img src="${product.img}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.price.toLocaleString()} VND</p>
                            <p>Height: ${product.height}</p>
                            <p>Width: ${product.width}</p>
                            <p>Depth: ${product.depth}</p>
                            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to cart</button>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
        categoryContainer.innerHTML += categoryHTML;
    });
}

function viewCart() {
    let cartList = cart.map(p => `- ${p.name} (${p.price.toLocaleString()} VND)`).join("\n");
    alert(cartList ? `Your shopping cart:\n${cartList}` : "Cart is empty!");
}

// Removed setupCategoryButtons function and its call to allow normal anchor navigation

function getRandomProducts(count) {
    // Flatten all products from all categories
    const allProducts = categories.flatMap(category => category.products);
    const selected = [];
    const usedIndices = new Set();

    while (selected.length < count && usedIndices.size < allProducts.length) {
        const randomIndex = Math.floor(Math.random() * allProducts.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            selected.push(allProducts[randomIndex]);
        }
    }
    return selected;
}

function renderProducts(containerId, products) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    products.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price.toLocaleString()} VND</p>
                <p>Height: ${product.height}</p>
                <p>Width: ${product.width}</p>
                <p>Depth: ${product.depth}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to cart</button>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}

function loadPopularProducts() {
    const popularProducts = getRandomProducts(5);
    renderProducts("popularProductsContainer", popularProducts);
}

function loadNewProducts() {
    const newProducts = getRandomProducts(5);
    renderProducts("newProductsContainer", newProducts);
}

function loadFeaturedProducts() {
    const featuredProducts = getRandomProducts(5);
    renderProducts("featuredProductsContainer", featuredProducts);
}

window.onload = () => {
    loadPopularProducts();
    loadNewProducts();
    loadFeaturedProducts();
    // loadCategories(); // Removed to prevent clearing product sections
    // searchProduct(); // Removed to prevent clearing product sections

    // Define popular products to exclude from submenu
    const popularProductNames = ["Iphone 15 pro max", "ps5", "neoprene dumbbell", "kalpen vacuum cleaner", "JBL quantum 800"];

    // Disabled submenu generation to remove hover submenu functionality
    /*
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(button => {
        const categoryName = button.getAttribute("data-category-name");
        const submenu = button.querySelector(".submenu");
        submenu.innerHTML = ""; // Clear existing submenu items

        // Find the category in categories array
        const category = categories.find(cat => cat.name === categoryName);
        if (category && category.products && category.products.length > 0) {
            const submenuList = document.createElement("ul");
            submenuList.classList.add("submenu-list");

            function addSubmenuItem(product) {
                const submenuItem = document.createElement("li");
                const link = document.createElement("a");
                link.textContent = product.name;
                link.href = product.url || "#";
                link.style.cursor = "pointer";
                submenuItem.appendChild(link);
                submenuList.appendChild(submenuItem);
            }

            if (categoryName === "Beds") {
                // Exclude specific products and add "Smartphone" instead (remove iphone 15 pro max)
                category.products.forEach(product => {
                    if (!["Samsung galaxy", "MacBook Pro", "iPhone 14", "Iphone 15 pro max"].includes(product.name)) {
                        addSubmenuItem(product);
                    }
                });
                const smartphoneItem = document.createElement("li");
                const smartphoneLink = document.createElement("a");
                smartphoneLink.textContent = "Smartphone";
                smartphoneLink.href = "#"; // Placeholder URL
                smartphoneLink.style.cursor = "pointer";
                smartphoneItem.appendChild(smartphoneLink);
                submenuList.appendChild(smartphoneItem);
            } else {
                category.products.forEach(product => {
                    if (!popularProductNames.includes(product.name)) {
                        addSubmenuItem(product);
                    }
                });
            }

            submenu.appendChild(submenuList);
        }
    });
    */

    // Dropdown hover delay logic
    let dropdownTimer = null;

    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.querySelector('.user-menu .dropdown');

    if (userMenu && dropdown) {
        // Ensure click on user icon toggles dropdown visibility
        const userIcon = userMenu.querySelector('.user-icon');
        if (userIcon) {
            userIcon.removeEventListener('click', () => {}); // Remove any previous empty listeners
            userIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                } else {
                    dropdown.classList.add('show');
                }
            });
        }

        // Mouse leave on dropdown hides it immediately
        dropdown.addEventListener('mouseleave', () => {
            dropdown.classList.remove('show');
        });

        // Remove CSS hover effect by removing the hover style class
        // We will remove the CSS rule '.user-menu:hover .dropdown' by overriding it here
        const styleSheet = document.styleSheets[0];
        for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
            const rule = styleSheet.cssRules[i];
            if (rule.selectorText === '.user-menu:hover .dropdown') {
                styleSheet.deleteRule(i);
            }
        }
    }
};
