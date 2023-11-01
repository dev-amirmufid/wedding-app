<!DOCTYPE html>
<html lang="en">


<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="wpOceans">
    <link rel="shortcut icon" type="image/png" href="assets/images/favicon.png">
    <title> Wedding of Tiara & Amir</title>
    <link href="{{asset('assets/css/themify-icons.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/font-awesome.min.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/flaticon.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/magnific-popup.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/animate.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/owl.carousel.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/owl.theme.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/slick.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/slick-theme.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/swiper.min.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/nice-select.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/owl.transitions.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/jquery.fancybox.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/odometer-theme-default.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/jquery-ui.css')}}" rel="stylesheet">
    <link href="{{asset('assets/sass/style.css')}}" rel="stylesheet">
    <link href="{{asset('assets/fontawesome/css/all.min.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/custom.css')}}" rel="stylesheet">
</head>

<body>

<!-- Modal -->
<div class="modal fade" id="openInvitation" 
    style="background-image: url(<?php echo asset('img/bg-invitation.jpg')?>);
    background-size: cover;
    background-position: center;"
    data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="openInvitationLabel" aria-hidden="true">
  <div class="modal-dialog bg-transparent">
    <div class="modal-content bg-transparent" style="height: 90vh; border:none;" >
      <div class="modal-body" style="display:flex; align-items: center; justify-content:center; ">
        <div class="text-center">
            <p>The Wedding of</p>
            
            <h1 style="font-size:6vh;">
                <span class="font-family-relington">Tiara</span> <span class="font-family-paragraph">&</span> <span class="font-family-relington">Amir</span>
            </h1>
            <p class="fs-3 text-dark"><?php echo $invitation->greeting?></p>
            <p class="fs-1 text-dark"><?php echo $invitation->fullname?></p>
        </div>
      </div>
      <div class="modal-footer" style="justify-content:center;">
        <button type="button" class="btn btn-lg btn-dark" data-bs-dismiss="modal" onclick="autoplay()">Open Invitation</button>
      </div>
    </div>
  </div>
</div>

    <!-- start page-wrapper -->
    <div class="page-wrapper">
        <!-- start preloader -->
        <div class="preloader">
            <div class="vertical-centered-box">
                <div class="content">
                    <div class="loader-circle"></div>
                    <div class="loader-line-mask">
                        <div class="loader-line"></div>
                    </div>
                    <img src="{{asset('assets/images/preloader.svg')}}" alt="">
                </div>
            </div>
        </div>

        
        <!-- end preloader -->
        <!-- Start header -->
        <header id="header">
            <div class="wpo-site-header wpo-header-style-1" id="sticky-header">
                <nav class="navigation navbar navbar-expand-lg navbar-light">
                    <div class="container-fluid">
                        <div class="row align-items-center">
                            <div class="col-md-3 col-3 d-lg-none d-block">
                                <div class="mobail-menu">
                                    <button type="button" class="navbar-toggler open-btn bg-white">
                                        <span class="sr-only">Toggle navigation</span>
                                        <span class="icon-bar first-angle bg-dark"></span>
                                        <span class="icon-bar middle-angle bg-dark"></span>
                                        <span class="icon-bar last-angle bg-dark"></span>
                                    </button>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-6 col-6 d-lg-block d-none">
                            </div>
                            <div class="col-md-6 col-6 d-lg-none dl-block">
                                <div class="navbar-header">
                                    <a class="navbar-brand" href="#"><img src="{{asset('img/logo.png')}}"
                                            alt=""></a>
                                </div>
                            </div>
                            <div class="col-lg-8 col-md-1 col-1">
                                <div id="navbar" class="collapse navbar-collapse navigation-holder">
                                    <button class="menu-close"><i class="ti-close"></i></button>
                                    <ul class="nav navbar-nav mb-2 mb-lg-0">
                                        <li><a href="#home">Home</a></li>
                                        <li><a href="#story">Story</a></li>
                                        <li><a href="#gallery">Galeri</a></li>
                                        <li><a href="#event">Acara</a></li>
                                        <li><a href="#rsvp">QR Code</a></li>
                                        <li><a href="#live_stream">Live Stream</a></li>
                                        <li><a href="#gift">Kado</a></li>
                                        <li><a href="#wish">Kirim Pesan</a></li>
                                    </ul>

                                </div><!-- end of nav-collapse -->
                            </div>
                            <div class="col-lg-2 col-md-2 col-2">
                            </div>
                        </div>
                    </div><!-- end of container -->
                </nav>
            </div>
        </header>
        <!-- end of header -->
        
        <!-- start of wpo-hero-section -->
        <section class="wpo-hero-section mb-4" id="home">
            <div class="container-fluid">
                <div class="row">
                    <div class="wpo-hero-items owl-carousel">
                        <div class="wpo-hero-item">
                            <div class="wpo-hero-img">
                                <img src="{{asset('img/slide-1.jpg')}}" alt="">
                            </div>
                        </div>
                        <div class="wpo-hero-item">
                            <div class="wpo-hero-img">
                                <img src="{{asset('img/slide-2.jpg')}}" alt="">
                            </div>
                        </div>
                        <div class="wpo-hero-item">
                            <div class="wpo-hero-img">
                                <img src="{{asset('img/slide-3.jpg')}}" alt="">
                            </div>
                        </div>
                        <div class="wpo-hero-item">
                            <div class="wpo-hero-img">
                                <img src="{{asset('img/slide-4.jpg')}}" alt="">
                            </div>
                        </div>
                        <div class="wpo-hero-item">
                            <div class="wpo-hero-img">
                                <img src="{{asset('img/slide-5.jpg')}}" alt="">
                            </div>
                        </div>
                        <div class="wpo-hero-item">
                            <div class="wpo-hero-img">
                                <img src="{{asset('img/slide-6.jpg')}}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- end of wpo-hero-section-->
        <!-- start wpo-wedding-date -->
        <section class="wpo-wedding-date">
            <div class="container">
                <h2 class="wow fadeInUp" data-wow-duration="1000ms">
                    <span class="shape-1"><img src="{{asset('assets/images/slider/shape.png')}}" alt=""></span>
                    <span class="font-family-relington">Tiara</span> <span class="font-family-paragraph">&</span> <span class="font-family-relington">Amir</span>
                    <span class="shape-2"><img src="{{asset('assets/images/slider/shape2.png')}}" alt=""> </span>
                </h2>
                <p class=" fs-3 wow fadeInUp" data-wow-duration="1200ms">We Are Getting Married <br /> <?php echo $date ?></p>
                <div class="row wow fadeInUp" data-wow-duration="1400ms">
                    <div class="col col-xs-12">
                        <div class="clock-grids">
                            <div id="clock" data-date="<?php echo $married_date ?>"></div>
                        </div>
                    </div>
                </div>
            </div> <!-- end container -->
        </section>
        <!-- end wpo-wedding-date -->
        <!-- start couple-section -->
        <section class="wpo-couple-section section-padding" id="couple">
            <div class="container">
                <div class="couple-area clearfix">
                    <div class="row align-items-center">
                        <div class="col col-md-5 col-12">
                            <div class="couple-item wow fadeInLeftSlow" data-wow-duration="1700ms">
                                <div class="couple-img">
                                    <img src="{{asset('img/tiara.jpg')}}" alt="">
                                </div>
                                <div class="couple-text">
                                    <h3>Tiara Deliviani</h3>
                                    <p class="fs-2">Putri Sulung</p>
                                    <p>Bapak Mahmud Bahrul Hayat & Ibu Euis Nurhayati</p>
                                    <div class="social">
                                        <ul>
                                            <li><a href="https://www.facebook.com/tiara.hayat"><i class="ti-facebook"></i></a></li>
                                            <li><a href="https://twitter.com/tiaradlvin"><i class="ti-twitter-alt"></i></a></li>
                                            <li><a href="https://www.instagram.com/tiaradlvin"><i class="ti-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col col-md-2 col-12">
                            <div class="middle-couple-shape wow fadeInUp" data-wow-duration="1000ms">
                                <div class="shape">
                                    <img src="{{asset('assets/images/couple/shape.png')}}" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="col col-md-5 col-12">
                            <div class="couple-item wow fadeInRightSlow" data-wow-duration="1700ms">
                                <div class="couple-img">
                                    <img src="{{asset('img/amir.jpg')}}" alt="">
                                </div>
                                <div class="couple-text">
                                    <h3>Amir Mufid</h3>
                                    <p class="fs-2">Putra Tunggal</p>
                                    <p>Bapak Yongki Lesmana (Alm) & Ibu Yeni Mulyati (Almh)</p>
                                    <div class="social">
                                        <ul>
                                            <li><a href="https://www.facebook.com/amirmoveit"><i class="ti-facebook"></i></a></li>
                                            <li><a href="https://twitter.com/amirmufid"><i class="ti-twitter-alt"></i></a></li>
                                            <li><a href="https://www.instagram.com/amirmufid"><i class="ti-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- end container -->
        </section>
        <!-- end couple-section -->
        <!-- start wpo-story-section -->
        <section class="wpo-story-section section-padding" id="story">
            <div class="container-fluid">
                <div class="wpo-section-title mb-0">
                    <h4>Our Story</h4>
                    <h2>Our Sweet Love Story</h2>
                </div>
                <div class="wpo-story-wrap">
                    <div class="wpo-story-item">
                        <div class="wpo-story-img-wrap">
                            <div class="wpo-story-img wow zoomIn" data-wow-duration="1000ms">
                                <img src="{{asset('img/story-1.jpg')}}" alt="">
                            </div>
                            <div class="wpo-img-shape">
                                <img src="{{asset('assets/images/story/shape.png')}}" alt="">
                            </div>
                        </div>
                        <div class="wpo-story-content">
                            <div class="wpo-story-content-inner wow fadeInRightSlow" data-wow-duration="1700ms">
                                <h2>First Time We Meet</h2>
                                <span>23 Oktober 2012</span>
                                <p>
                                    Pada semasa sekolah di tahun 2012 pertama kali kami bertemu. 
                                    Dan menjalin hubungan pada tanggal 23 Oktober 2012.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="wpo-story-item">
                        <div class="wpo-story-img-wrap">
                            <div class="wpo-story-img wow zoomIn" data-wow-duration="1000ms">
                                <img src="{{asset('img/story-2.jpg')}}" alt="">
                            </div>
                            <div class="wpo-img-shape">
                                <img src="{{asset('assets/images/story/shape.png')}}" alt="">
                            </div>
                        </div>
                        <div class="wpo-story-content">
                            <div class="wpo-story-content-inner wow fadeInLeftSlow" data-wow-duration="1700ms">
                                <h2>Our Second Story</h2>
                                <span>12 Desember 2021</span>
                                <p>
                                    Setalah 10 tahun lamanya kami bertemu kembali, dan mencoba memulai kembali lembaran kisah cinta yang baru.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="wpo-story-item">
                        <div class="wpo-story-img-wrap">
                            <div class="wpo-story-img wow zoomIn" data-wow-duration="1000ms">
                                <img src="{{asset('img/story-3.jpg')}}" alt="">
                            </div>
                            <div class="wpo-img-shape">
                                <img src="{{asset('assets/images/story/shape.png')}}" alt="">
                            </div>
                        </div>
                        <div class="wpo-story-content">
                            <div class="wpo-story-content-inner wow fadeInRightSlow" data-wow-duration="1700ms">
                                <h2>Engagement</h2>
                                <span>12 Desember 2022</span>
                                <p>Ini adalah hari dimana kami memutuskan untuk saling berkomitmen menjalin hubungan sampai ke jenjang pernikahan.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- end container -->
        </section>
        <!-- end story-section -->
        <!-- start wpo-portfolio-section -->
        <section class="wpo-portfolio-section-s2 pb-0 section-padding" id="gallery">
            <div class="container">
                <div class="wpo-section-title">
                    <h4>Sweet Memories</h4>
                    <h2>Our Captured Albums</h2>
                </div>
                <div class="sortable-gallery">
                    <div class="gallery-filters"></div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="portfolio-grids gallery-container clearfix">
                                <div class="grid">
                                    <div class="img-holder">
                                        <a href="{{asset('assets/images/portfolio/10.jpg')}}" class="fancybox"
                                            data-fancybox-group="gall-1">
                                            <img src="{{asset('assets/images/portfolio/10.jpg')}}" alt class="img img-responsive">
                                            <div class="hover-content">
                                                <i class="ti-plus"></i>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="grid">
                                    <div class="img-holder">
                                        <a href="{{asset('img/moment-2.jpg')}}" class="fancybox"
                                            data-fancybox-group="gall-1">
                                            <img src="{{asset('img/moment-2.jpg')}}" alt class="img img-responsive">
                                            <div class="hover-content">
                                                <i class="ti-plus"></i>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="grid">
                                    <div class="img-holder">
                                        <a href="{{asset('img/moment-5.jpg')}}" class="fancybox"
                                            data-fancybox-group="gall-1">
                                            <img src="{{asset('img/moment-5.jpg')}}" alt class="img img-responsive">
                                            <div class="hover-content">
                                                <i class="ti-plus"></i>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="grid">
                                    <div class="img-holder">
                                        <a href="{{asset('img/moment-1.jpg')}}" class="fancybox"
                                            data-fancybox-group="gall-1">
                                            <img src="{{asset('img/moment-1.jpg')}}" alt class="img img-responsive">
                                            <div class="hover-content">
                                                <i class="ti-plus"></i>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="grid">
                                    <div class="img-holder">
                                        <a href="{{asset('img/moment-3.jpg')}}" class="fancybox"
                                            data-fancybox-group="gall-1">
                                            <img src="{{asset('img/moment-3.jpg')}}" alt class="img img-responsive">
                                            <div class="hover-content">
                                                <i class="ti-plus"></i>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="grid">
                                    <div class="img-holder">
                                        <a href="{{asset('img/moment-4.jpg')}}" class="fancybox"
                                            data-fancybox-group="gall-1">
                                            <img src="{{asset('img/moment-4.jpg')}}" alt class="img img-responsive">
                                            <div class="hover-content">
                                                <i class="ti-plus"></i>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="grid">
                                    <div class="img-holder">
                                        <a href="{{asset('assets/images/portfolio/11.jpg')}}" class="fancybox"
                                            data-fancybox-group="gall-1">
                                            <img src="{{asset('assets/images/portfolio/11.jpg')}}" alt class="img img-responsive">
                                            <div class="hover-content">
                                                <i class="ti-plus"></i>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div> <!-- end container -->
        </section>
        <!-- end wpo-portfolio-section -->
        <!-- start wpo-event-section -->
        <section class="wpo-event-section section-padding pb-0" id="event">
            <div class="container">
                <div class="wpo-section-title">
                    <h4>Our Wedding</h4>
                    <h2>When & Where</h2>
                </div>
                <div class="wpo-event-wrap">
                    <div class="row">
                    <?php foreach($events as $event) { ?> 
                        <div class="col col-md col-12">
                            <div class="wpo-event-item">
                                <div class="wpo-event-img">
                                    <img src="<?php echo asset('storage/'.$event->list_events->image.'')?>" alt="">
                                    <div class="title"><h2><?php echo $event->list_events->event_name; ?></h2></div>
                                </div>
                                <div class="wpo-event-text">
                                    <ul>
                                        <li class="fw-bold"><?php echo $event->list_events->event_dates; ?></li>
                                        <li class="fs-2"><?php echo $event->list_events->event_hours; ?></li>
                                        <li><?php echo $event->list_events->short_address; ?></li>
                                        <li><?php echo $event->list_events->address; ?></li>
                                        <li> 
                                        <a href="https://goo.gl/maps/Mw7MEs4dyoZxcdxT8" 
                                        ><i class="fa-solid fa-location-dot"></i> Lihat di Google Maps</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    <?php } ?>

                    </div>
                </div>

            </div> <!-- end container -->
        </section>
        <!-- end wpo-event-section -->
        <!-- start of wpo-contact-section -->
        <section class="wpo-contact-section-s3 section-padding" id="rsvp">
            <div class="container">
                <div class="wpo-section-title">
                    <h4>RSVP</h4>
                    <h2>Come and celebrate our happiest moment</h2>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col col-xl-6 col-lg-6 col-md-12 col-12 rsvp-box">
                        <div class="wpo-contact-section-wrapper wow fadeInLeftSlow" data-wow-duration="1700ms" style="height:100%">
                            <div class="wpo-contact-form-area">
                                <div class="wpo-section-title">
                                    <h4><?php echo $invitation->fullname; ?></h4>
                                </div>
                                
                                <form class="contact-validation-active" id="rsvp_form">
                                    <div class="text-center">
                                        <p>Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai atas kehadiran serta doa restu, kami ucapkan terimakasih.</p>
                                    </div>
                                    <div class="radio-buttons">
                                        <p>
                                            <input type="radio" id="attend" name="rsvp_status" value="1" <?php echo $invitation->rsvp_status != 2 ? "checked" : "" ?>>
                                            <label for="attend">Iya, Saya akan hadir</label>
                                        </p>
                                        <p>
                                            <input type="radio" id="not" name="rsvp_status" value="2" <?php echo $invitation->rsvp_status == 2 ? "checked" : "" ?>>
                                            <label for="not">Maaf, Saya tidak bisa hadir</label>
                                        </p>
                                    </div>
                                    <div class="text-left">
                                        <i>*Submit RSVP form dan dapatkan QRCode untuk memasuki acara pernikahan & menukarkan suvenir.</i>
                                    </div>
                                    <div class="submit-area">
                                        <button type="submit" class="theme-btn">RSVP</button>
                                        <div id="c-loader">
                                            <i class="ti-reload"></i>
                                        </div>
                                    </div>
                                    <div class="clearfix error-handling-messages">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="card col col-xl-6 col-lg-6 col-md-12 col-12 text-center wow fadeInRightSlow" data-wow-duration="1700ms">
                        <div class="card-body" style="height:100%;">
                            <div class="qr-img-warning alert alert-warning align-items-center" role="alert" style="display:none;">
                                <div>
                                    Harap isi RSVP untuk mendapatkan QRCode
                                </div>
                            </div>

                            <span class="rsvp-absent" style="font-size:154px"><i class="fa-regular fa-face-frown"></i></span>
                            <br />
                            <span class="rsvp-absent fs-3">Kami masih mengharapkan kamu bisa hadir</span>
                            <br />
                            <a href="data:image/png;base64, {!! base64_encode(QrCode::format('png')->size(512)->generate($invitation->id)) !!} " class="fancybox" data-fancybox-group="qrcode">
                                <img class="qr-img" src="data:image/png;base64, {!! base64_encode(QrCode::format('png')->size(512)->generate($invitation->id)) !!} ">
                            </a>
                        </div>   
            
                        <div class="card-footer qr-img">
                            <div class="rsvp-info">
                                <div class="text-center">
                                    <p class="card-text fs-1">SCAN ME</p>
                                    <p class="text-center my-4 fs-3"><i>*Tunjukan QRCode ini kepada petugas acara.</i></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        <!-- end of wpo-contact-section -->

        
      <section class="wpo-story-section-s3 section-padding pb-0 pt-0" >
          <div class="wpo-story-wrap">
            <div class="wpo-story-item">
              <div
                class="wpo-story-img-wrap wow fadeInLeftSlow"
                data-wow-duration="1700ms">
                <div class="wpo-story-img">
                  <img src="{{asset('img/ig-filter.jpg')}}" alt="" />
                </div>
              </div>
              <div
                class="wpo-story-content wow fadeInRightSlow"
                data-wow-duration="1700ms">
                <div class="wpo-story-content-inner">
               <a href="https://www.instagram.com/ar/720463443422301/" class="theme-btn-s4"><i class="fa-brands fa-instagram"></i> Download Filter Instagram</a>
                  <p>
                    Bagikan dan abadikan moment bersama kami menggunakan filter instagram yang bisa kamu download melalui link berikut. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end container -->
      </section>

        <!-- start wpo-video-section -->
        <section class="wpo-video-section-s2 pb-0 section-padding" id="live_stream">
          
            <div class="container-fluid">
                <div class="wpo-section-title">
                    <h4>Live Streaming</h4>
                    <h2>Live Streame Online</h2>
                </div>
                <div class="text-center">
                    <a href="https://www.youtube.com/@tiaradlvin" class="btn btn-lg btn-danger"><i class="fa-brands fa-youtube"></i> Youtube</a>
                    <a href="https://www.tiktok.com/@iis_alamanda" class="btn btn-lg btn-dark"><i class="fa-brands fa-tiktok"></i> TikTok</a>
                    <a href="https://www.instagram.com/tiaradlvin" class="btn btn-lg btn-outline-dark"><i class="fa-brands fa-instagram"></i> Instagram</a>
                </div>
            </div> <!-- end container -->
        </section>
        <!-- end wpo-video-section-->

        <!-- start wpo-contact-pg-section -->
        <section class="wpo-contact-pg-section section-padding" id="gift">
            <div class="container">
                <div class="wpo-section-title">
                    <h4>Kado Pernikahan</h4>
                    <h2>Kirim Kado Pernikahan</h2>
                    <p class="mt-4">Terima kasih banyak telah bersama kami di hari istimewa kami dan membawakan kami hadiah terindah. Tolong terus doakan kami. Terima kasih banyak telah bergabung bersama di hari paling istimewa kami ini.</p>
                </div>
                <div class="row">
                    <div class="col col-lg-10 offset-lg-1">
                        <div class="office-info">
                            <div class="row">
                                <div class="col col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div class="office-info-item">
                                            <img src="{{ asset('img/bank-bca.png') }}" alt="" />
                                        <div class="office-info-text">
                                            <h2>BCA 1</h2>
                                            <p>An. Tiara Deliviani</p>
                                            <p id="bank_2"> <button class="btn btn-light" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Copied" onclick="copyContent('1393761621')">1393761621 <i class="fa-solid fa-clone ml-3"></i></button></p>
                                        </div>
                                    </div>
                                </div> 
                                <div class="col col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div class="office-info-item">
                                            <img src="{{ asset('img/bank-dana.png') }}" alt="" />
                                        <div class="office-info-text">
                                            <h2>Dana</h2>
                                            <p>Tiara Deliviani</p>
                                            <p id="bank_1"><button class="btn btn-light" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Copied" onclick="copyContent('081224345612')">081224345612 <i class="fa-solid fa-clone ml-3"></i></button></p>
                                         </div>
                                    </div>
                                </div> 
                                <div class="col col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div class="office-info-item">
                                            <img src="{{ asset('img/bank-bjb.png') }}" alt="" />
                                        <div class="office-info-text">
                                            <h2>BJB</h2>
                                            <p>An. Euis Nurhayati</p>
                                            <p id="bank_1"><button class="btn btn-light" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Copied" onclick="copyContent('1760128470')">5130201697875 <i class="fa-solid fa-clone ml-3"></i></button></p>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>                
                </div>
            </div> <!-- end container -->
        </section>

        <section class="wpo-contact-pg-section section-padding" id="wish">
            <div class="container">
                <div class="wpo-section-title">
                    <h4>Kirim Pesan & Doa</h4>
                    <h2>Kirim pesan dan doa pernikahan</h2>
                </div>
                <div class="row">
                    <div class="col col-lg-10 offset-lg-1">
                        <div class="wpo-contact-form-area">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <form class="contact-validation-active" id="guest_message_form">
                                        <div class="fullwidth">
                                            <input type="hidden" name="invitation_id" value="{{ $invitation->id }}" />
                                            <textarea style="resize:none;" class="form-control" name="message" placeholder="Pesan & Doa untuk kami..."></textarea>
                                        </div>
                                        <div class="submit-area">
                                            <button type="submit" id="kirim_pesan_btn" class="theme-btn-s4">Kirim Pesan</button>
                                            <div id="loader">
                                                <i class="ti-reload"></i>
                                            </div>
                                        </div>
                                        <div class="clearfix error-handling-messages">
                                            <div id="success">Thank you</div>
                                            <div id="error"> Error occurred while sending email. Please try again later. </div>
                                        </div>
                                    </form>
                                </div>
                            
                                <div class="col-12 col-md-6">
                                    <div class="wpo-blog-single-section">
                                        <div class="comments-area">
                                            <div class="comments-section">
                                            <ol class="comments" style="overflow-y: auto;height: 500px;">
                                            </ol>
                                            </div>
                                            <!-- end comments-section -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                    </div>                
                </div>
            </div> <!-- end container -->
        </section>

        <!-- end wpo-contact-pg-section -->
        <!-- wpo-site-footer start -->
        <div class="wpo-site-footer text-center mt-4">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="footer-image">
                            <div class="logo" href="#"><img style="margin-top:80px;" src="{{asset('img/logo.png')}}" alt=""></div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="copyright">
                            <p>Created by <a href="https://www.instagram.com/amirmufid">Amir Mufid</a> | All right reserved.</p>
                            <p>© Copyright 2023</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- wpo-site-footer end -->
    </div>
    <!-- end of page-wrapper -->
    <div>
    <audio style="
    position: fixed;
    bottom: 10px;
    width: 95%;
    z-index: 9;
    " id="myAudio"  autoplay loop>
        <source src="{{asset('audio/ONE OK ROCK - Wherever You Are (Acoustic).mp3')}}" type="audio/mp3">
        Your browser does not support the audio element.
    </audio>
    </div>
    <!-- All JavaScript files
    ================================================== -->
    <script src="{{asset('assets/fontawesome/js/all.min.js')}}"></script>
    <script src="{{asset('assets/js/jquery.min.js')}}"></script>
    <script src="{{asset('assets/js/jquery.validate.min.js')}}"></script>
    <script src="{{asset('assets/js/bootstrap.bundle.min.js')}}"></script>
    <!-- Plugins for this template -->
    <script src="{{asset('assets/js/modernizr.custom.js')}}"></script>
    <script src="{{asset('assets/js/jquery.dlmenu.js')}}"></script>
    <script src="{{asset('assets/js/jquery-plugin-collection.js')}}"></script>
    <script src="{{asset('assets/js/moment.min.js')}}"></script>
    <!-- Custom script for this template -->
    <script src="{{asset('assets/js/script.js')}}"></script>
    
    <script>
        const copyContent = async (text) => {
            try {
            navigator.clipboard.writeText(text);
            console.log('Content copied to clipboard');
            } catch (err) {
            console.error('Failed to copy: ', err);
            }
        }
        function autoplay(){
            document.getElementById("myAudio").play();
        }
        
        const myModal = new bootstrap.Modal('#openInvitation', {
            keyboard: false
        })
                
        let rsvpStatus = parseInt('{{$invitation->rsvp_status}}');
        if(rsvpStatus == 0){
            $('.rsvp-box').fadeIn();
            $('.qr-img').fadeOut();
            $('.qr-img-warning').fadeIn();
            $('.rsvp-absent').fadeOut();
            $('.rsvp-present').fadeIn();
            
        } else if(rsvpStatus == 1){
            $('.rsvp-box').fadeOut();
            $('.qr-img').fadeIn();
            $('.qr-img-warning').fadeOut();
            $('.rsvp-absent').fadeOut();
            $('.rsvp-present').fadeIn();
        } else {
            $('.qr-img').fadeOut();
            $('.qr-img-warning').fadeOut();
            $('.rsvp-absent').fadeIn();
            $('.rsvp-present').fadeOut();
        }

        myModal.show();

        $('#rsvp_form').validate({
            submitHandler: function(form) {
                $.ajax({
                    url: "{{url('api/invitations/update-rsvp/'.$invitation->id)}}",
                    type: "PUT",
                    data: $(form).serialize(),
                    success: function(response) {
                        if(response.success) {
                            if(response.data.rsvp_status == 1){
                                $('.rsvp-box').fadeOut();
                                $('.qr-img').fadeIn();
                                $('.qr-img-warning').fadeOut();
                                $('.rsvp-absent').fadeOut();
                                $('.rsvp-present').fadeIn();
                            } else {
                                
                                $('.qr-img').fadeOut();
                                $('.qr-img-warning').fadeOut();
                                $('.rsvp-absent').fadeIn();
                                $('.rsvp-present').fadeOut();
                            }
                        }

                    }            
                });
            }
        });

        
        $('#guest_message_form').validate({
            submitHandler: function(form) {
                $.ajax({
                    url: "{{url('api/guest-message')}}",
                    type: "POST",
                    data: $(form).serialize(),
                    beforeSend: function(form) {
                        $('#kirim_pesan_btn').prop('disabled', true);
                        $('#kirim_pesan_btn').prop('disabled', false);
                    },
                    success: function(response) {
                        if(response.success) {
                            loadMessages();
                            form.reset();
                            
                            $('#success').fadeIn(500);
                            setTimeout(() => {
                                $('#success').fadeOut(500);
                            }, 1000);

                        }
                    }            
                });
            }
        });

        const loadMessages = () => {
            $.ajax({
                url: "{{url('api/guest-message')}}",
                type: "GET",
                success: function(response) {
                    if(response.success) {
                        $('.comments').empty()
                        response.data.map((item)=>{
                            const comment = `
                                <li class="comment">
                                    <div class="comment-main-area p-0">
                                        <div class="comment-wrapper">
                                            <div class="comments-meta">
                                            <h4>
                                                ${item.invitation.fullname}
                                                <span class="comments-date"
                                                >${moment(item.created_at).format('DD-MMM-YYYY LT')}</span
                                                >
                                            </h4>
                                            </div>
                                            <div class="comment-area">
                                            <p>${item.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            `;
                            
                            $('.comments').append(comment)
                        })
                        
                        
                    }
                }            
            });
        }

        loadMessages();
    </script>
</body>


</html>
