<!DOCTYPE html><html class="light" lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Step 4 of 9 - Prize 1</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&amp;family=Quicksand:wght@500;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-tint": "#a53b29",
                        "tertiary": "#006a69",
                        "surface-container-high": "#ede7df",
                        "on-tertiary-container": "#004241",
                        "on-secondary-container": "#715d00",
                        "tertiary-fixed-dim": "#76d6d5",
                        "on-secondary-fixed": "#221b00",
                        "surface-dim": "#dfd9d1",
                        "primary-fixed-dim": "#ffb4a6",
                        "on-secondary-fixed-variant": "#554500",
                        "on-primary-container": "#731709",
                        "on-background": "#1d1b16",
                        "primary-fixed": "#ffdad4",
                        "on-tertiary-fixed-variant": "#00504f",
                        "tertiary-container": "#51b3b2",
                        "background": "#fff9f0",
                        "secondary": "#705d00",
                        "error-container": "#ffdad6",
                        "inverse-primary": "#ffb4a6",
                        "on-primary-fixed-variant": "#842415",
                        "on-tertiary-fixed": "#002020",
                        "on-primary-fixed": "#3f0300",
                        "secondary-fixed-dim": "#e8c426",
                        "surface-container-highest": "#e7e2d9",
                        "error": "#ba1a1a",
                        "secondary-container": "#fdd73b",
                        "on-surface-variant": "#57423e",
                        "surface-container-low": "#f9f3ea",
                        "on-error-container": "#93000a",
                        "inverse-on-surface": "#f6f0e7",
                        "on-tertiary": "#ffffff",
                        "on-error": "#ffffff",
                        "surface-container": "#f3ede4",
                        "surface-container-lowest": "#ffffff",
                        "surface": "#fff9f0",
                        "inverse-surface": "#32302a",
                        "on-surface": "#1d1b16",
                        "outline-variant": "#dec0ba",
                        "outline": "#8b716d",
                        "secondary-fixed": "#ffe173",
                        "on-secondary": "#ffffff",
                        "primary": "#a53b29",
                        "on-primary": "#ffffff",
                        "surface-bright": "#fff9f0",
                        "surface-variant": "#e7e2d9",
                        "primary-container": "#ff7e67",
                        "tertiary-fixed": "#93f2f1"
                    },
                    "borderRadius": {
                        "DEFAULT": "1rem",
                        "lg": "2rem",
                        "xl": "3rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "stack-gap-lg": "40px",
                        "section-margin": "64px",
                        "stack-gap-md": "24px",
                        "unit": "8px",
                        "container-padding": "24px",
                        "stack-gap-sm": "12px"
                    },
                    "fontFamily": {
                        "body-lg": ["Quicksand"],
                        "headline-md": ["Bricolage Grotesque"],
                        "display-lg": ["Bricolage Grotesque"],
                        "display-mobile": ["Bricolage Grotesque"],
                        "label-caps": ["Quicksand"],
                        "body-md": ["Quicksand"]
                    },
                    "fontSize": {
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "500" }],
                        "headline-md": ["28px", { "lineHeight": "34px", "fontWeight": "700" }],
                        "display-lg": ["48px", { "lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "800" }],
                        "display-mobile": ["36px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "800" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "500" }]
                    }
                }
            }
        }
    </script>
<style>
        .float-animation {
            animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .pop-in {
            animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes popIn {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .bg-sparkles {
            background-image: radial-gradient(circle at 20% 30%, #ff7e67 2px, transparent 2px),
                              radial-gradient(circle at 80% 40%, #fdd73b 2px, transparent 2px),
                              radial-gradient(circle at 40% 70%, #ff7e67 1.5px, transparent 1.5px),
                              radial-gradient(circle at 70% 80%, #fdd73b 2.5px, transparent 2.5px);
            background-size: 100px 100px;
        }
    </style>
</head>
<body class="bg-background text-on-background min-h-screen flex flex-col font-body-md overflow-x-hidden">
<!-- TopAppBar -->
<header class="w-full top-0 sticky bg-background z-40 hidden md:flex">
<div class="flex items-center justify-between px-container-padding py-unit w-full max-w-[480px] mx-auto flat no shadows">
<button class="hover:opacity-80 transition-opacity Active: scale-95 transition-transform duration-200">
<span class="material-symbols-outlined text-primary text-headline-md font-headline-md">celebration</span>
</button>
<h1 class="font-headline-md text-headline-md text-center flex-1 text-on-background">Step 4 of 9</h1>
<button class="hover:opacity-80 transition-opacity Active: scale-95 transition-transform duration-200">
<span class="material-symbols-outlined text-outline text-headline-md font-headline-md">settings</span>
</button>
</div>
</header>
<!-- Main Content Canvas -->
<main class="flex-1 flex flex-col items-center relative w-full max-w-[480px] mx-auto px-container-padding pt-16 pb-32 z-10 bg-sparkles">
<!-- Progress Segment (Visual representation of 'The Path') -->
<div class="absolute top-8 w-full flex justify-center gap-2 px-8">
<div class="h-2 flex-1 bg-primary rounded-full opacity-30"></div>
<div class="h-2 flex-1 bg-primary rounded-full opacity-30"></div>
<div class="h-2 flex-1 bg-primary rounded-full opacity-30"></div>
<div class="h-2 flex-1 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(255,126,103,0.5)]"></div>
<div class="h-2 flex-1 bg-surface-variant rounded-full"></div>
<div class="h-2 flex-1 bg-surface-variant rounded-full"></div>
<div class="h-2 flex-1 bg-surface-variant rounded-full"></div>
<div class="h-2 flex-1 bg-surface-variant rounded-full"></div>
<div class="h-2 flex-1 bg-surface-variant rounded-full"></div>
</div>
<div class="flex flex-col items-center text-center pop-in mt-12 w-full">
<div class="mb-2 self-start">
<span class="bg-surface-variant text-on-surface-variant font-label-caps text-label-caps px-3 py-1 rounded-full inline-block mb-4">04 PRIZE 1</span>
</div>
<h2 class="font-display-lg md:font-display-lg text-display-mobile md:text-display-lg text-on-background mb-8 tracking-tight">Your Journey</h2>
<div class="w-full flex flex-col gap-6 mb-12 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-primary/20">
<div class="flex items-start gap-4 relative z-10">
<div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-md">
<span class="material-symbols-outlined text-[20px]">cake</span>
</div>
<div class="bg-surface-container-low p-4 rounded-2xl flex-1 shadow-sm border border-outline-variant/30">
<p class="font-label-caps text-primary mb-1">24 Agustus 2005</p>
<h3 class="font-headline-md text-on-background">Lahir</h3>
</div>
<div class="shrink-0 w-[70px] h-[70px] bg-white p-1 shadow-md transform rotate-3 border border-outline-variant/30">
<img alt="Newborn photo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm4MMLJlfHagkxpIM00naspNutMN76uPbcilqoR11Yz4GUPQSkKqdczIQfxfVuTtL8ESQwYOFa_T_DJ13M65izGQHkUhckASJSnrbVECcOaZicOCRf3FAofgU2EAd1e7T1Oz1ZhaGcVCBo8HwBib007W9Zta0wZMnBhd5WhhfhG3m9sPk7XeYwJGxg8xZoRqOTLYTW_CpASD1gjjJSoqG6LUFYIkrj4JLCHmrAa-_s3naucxveWKFc">
</div></div>
<div class="flex items-start gap-4 relative z-10">
<div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0 shadow-md">
<span class="material-symbols-outlined text-[20px]">school</span>
</div>
<div class="bg-surface-container-low p-4 rounded-2xl flex-1 shadow-sm border border-outline-variant/30">
<p class="font-label-caps text-secondary mb-1">14 Tahun</p>
<h3 class="font-headline-md text-on-background">MTS</h3>
</div>
<div class="shrink-0 w-[70px] h-[70px] bg-white p-1 shadow-md transform -rotate-3 border border-outline-variant/30">
<img alt="MTS student photo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA57NpHG_4MszHN-w3nIlftLHhYCHxnf17OXKwjiJrZuaRzbCG2BBajLVDP8VY919LVKOBKM1ESFQZr4lsYjpm4LIIsYrj3WaJFWHmFXOq6b-jq7ko9WU4nf4ztuwqj-5TzNJ-6Oe_q5r8o7jrOrXXv-F_g4cswM_1nKYLsaai9NRZN9N_fs3lBpqZIJkTvbGUl7vHmCRPu1odt169D9rbbDdby8MCPw9F6tYsiIJ-2uQmhcu6BKxKX">
</div></div>
<div class="flex items-start gap-4 relative z-10">
<div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0 shadow-md">
<span class="material-symbols-outlined text-[20px]">history_edu</span>
</div>
<div class="bg-surface-container-low p-4 rounded-2xl flex-1 shadow-sm border border-outline-variant/30">
<p class="font-label-caps text-secondary mb-1">17 Tahun</p>
<h3 class="font-headline-md text-on-background">SMK</h3>
</div>
<div class="shrink-0 w-[70px] h-[70px] bg-white p-1 shadow-md transform rotate-3 border border-outline-variant/30">
<img alt="SMK student photo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG-n2LCWded4jH4nLVWdn3RKwLxTsRMINOkAw1_PAyMet_6sZixeHLTTMTAjIYzOaDuORECBzmgUxVn7giZmLw_K07WOwYsZDe5aiNsmrxiltghfJg6uP6Rg37uGW6GU5ML3CWtZ2hOHqfIDxcxZyXD8M1IwNNJ7j9gOoMgElI1PPYKxep09V0kXkpUelBGDOfOGVumZ_yJG9hZHSioC92LQKjsoDZ3yTBp3yBls-DIpeh2l27yxVP">
</div></div>
<div class="flex items-start gap-4 relative z-10">
<div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shrink-0 shadow-md">
<span class="material-symbols-outlined text-[20px]">auto_stories</span>
</div>
<div class="bg-surface-container-low p-4 rounded-2xl flex-1 shadow-sm border border-outline-variant/30">
<p class="font-label-caps text-primary mb-1">19 Tahun</p>
<h3 class="font-headline-md text-on-background">Kuliah</h3>
</div>
<div class="shrink-0 w-[70px] h-[70px] bg-white p-1 shadow-md transform -rotate-3 border border-outline-variant/30">
<img alt="University student photo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP5MeIC_xztsXOxQynEuQVvnOG8C63CSj1i0w-OITYeHLO157Q9qgRezpvyt38C3mIL-Mr1PJhHxbnpHM3ZeNs6TcMxEcV3A3isx3XVmiaJuUxstS7Sd9pxKTMC_iGs_fgIgiLNqHC8-XnSA7rZUs1k5bLaAtit7dieYYeupOT8NOli42-gbovIuvFz1OGUpGt9IgGSzWcVx4JkQapt_Yu9WY3FuihhalCgrc5yQkM1lsVhGYE3zgC">
</div></div>
</div>
<button class="bg-secondary-container text-on-secondary-container font-headline-md text-body-lg px-8 py-4 rounded-full w-[80%] max-w-[240px] shadow-[0_4px_0_0_#d4b125,0_10px_20px_0_rgba(253,215,59,0.3)] hover:translate-y-1 hover:shadow-[0_2px_0_0_#d4b125,0_5px_10px_0_rgba(253,215,59,0.3)] active:translate-y-2 active:shadow-none transition-all duration-200">
                Lanjutkan
            </button>
</div>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex justify-around items-center px-4 pb-8 pt-4 bg-surface-container-low z-50 rounded-t-lg shadow-[0_-4px_20px_0_rgba(255,126,103,0.1)] md:hidden">
<button class="flex flex-col items-center justify-center text-outline px-4 py-2 opacity-70 hover:text-primary transition-colors">
<span class="material-symbols-outlined mb-1">grid_view</span>
<span class="font-label-caps text-label-caps uppercase tracking-widest">The Game</span>
</button>
<button class="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-6 py-2 transition-all duration-300 transform scale-105 shadow-lg Active: translate-y-1 transition-all duration-200 ease-out">
<span class="material-symbols-outlined mb-1 text-on-primary-container" style="font-variation-settings: 'FILL' 1;">auto_awesome_motion</span>
<span class="font-label-caps text-label-caps uppercase tracking-widest">Our Path</span>
</button>
<button class="flex flex-col items-center justify-center text-outline px-4 py-2 opacity-70 hover:text-primary transition-colors">
<span class="material-symbols-outlined mb-1">card_giftcard</span>
<span class="font-label-caps text-label-caps uppercase tracking-widest">Surprise</span>
</button>
</nav>
<script>
        // Simple script to handle bottom nav interactions for demonstration
        document.querySelectorAll('nav button').forEach(button => {
            button.addEventListener('touchstart', () => {
                button.style.transform = 'scale(0.95)';
            });
            button.addEventListener('touchend', () => {
                // Reset other buttons
                document.querySelectorAll('nav button').forEach(b => {
                    b.className = "flex flex-col items-center justify-center text-outline px-4 py-2 opacity-70 hover:text-primary transition-colors";
                    b.querySelector('span').style.fontVariationSettings = "'FILL' 0";
                });
                // Set active class
                button.className = "flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-6 py-2 transition-all duration-300 transform scale-105 shadow-lg";
                button.querySelector('span').style.fontVariationSettings = "'FILL' 1";
                button.style.transform = 'scale(1.05)';
            });
        });
    </script>
</body></html>
