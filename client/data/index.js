import logoDark from "@/images/logo.png";
export const Logo = {
  dark: logoDark
};

export const NavLinksData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about"
  },
  {
    name: "Services",
    url: "",
    subItems: [
      {
        name: "Business Cards",
        url: "/all-services"
      },
      {
        name: "Postcards & Print Advertising",
        url: "/services"
      },
      {
        name: "Signs, Banners & Posters",
        url: "/service-details"
      },
      {
        name: "Labels, Stickers & Packaging",
        url: "/service-details"
      },
      {
        name: "Home & Gifts",
        url: "/service-details"
      },
      {
        name: "Celebrations, Invitations & Stationery",
        url: "/service-details"
      },
      {
        name: "Wedding",
        url: "/service-details"
      },
      {
        name: "Clothing & Bags",
        url: "/service-details"
      },
      {
        name: "Design & Logo",
        url: "/service-details"
      }
    ]
  },
 
  {
    name: "Blog",
    url: "/blog",
  },
  {
    name: "Contact",
    url: "/contact"
  }
];

import sliderOne1 from "@/images/banner-1-1.jpg";
import sliderOne2 from "@/images/banner-1-2.jpg";

export const SliderOneData = [
  {
    image: sliderOne1,
    title: "Full Printing Service",
    subText: "We bring design together with technology",
    button: {
      label: "Get Started",
      url: "/pricing"
    }
  },
  {
    image: sliderOne2,
    title: "Copying and \n Printing Center",
    subText: "We bring design together with technology",
    button: {
      label: "Get Started ",
      url: "/pricing"
    }
  }
];

import sliderTwo1 from "@/images/banner-featured-1-1.png";

export const SliderTwoData = {
  image: sliderTwo1,
  posts: [
    {
      title: "Quality \n Printing \n Service",
      subTitle: "We believe in the power of great design",
      button: {
        label: "Our Pricing",
        url: "/pricing"
      }
    },
    {
      title: "Quality \n Printing \n Service",
      subTitle: "We believe in the power of great design",
      button: {
        label: "Our Pricing",
        url: "/pricing"
      }
    }
  ]
};

import video1 from "@/images/video-box-1-1.jpg";
export const VideoData = {
  image: video1,
  ID: "mUhcFs6v-Xw",
  caption: "Printfinity Makes \n Every Card \n Unique"
};

export const CallToActionData = {
  sectionContent: {
    subText: "Business stationery printing",
    title: "Even More Good \n Stuff",
    textAlignment: "left"
  },
  lists: [
    "Professional designs with added fizz",
    "Create an army of business stationery",
    "Take your attention to detail up a level",
    "Totally safe for laser printers"
  ],
  button: {
    label: "Learn More",
    url: "/about"
  }
};

import callToActionTwo1 from "@/images/free-sample-1-2.jpg";

export const CallToActionTwoData = {
  sectionContent: {
    subText: "Order a free sample",
    title: "Get a Feel For \n Colors",
    textAlignment: "left"
  },
  content:
    "Order a sample so you can touch and feel our premium range of papers and finishes for yourself. It’s free! Print full color on both sides of your business cards.",
  button: {
    label: "Get Sample",
    url: "/contact"
  },
  image: {
    name: callToActionTwo1,
    caption: "Professional designs \n with added fizz"
  }
};

export const CallToActionThreeData = {
  title: "Try Our New \n  Premium Extra \n  Thick Cards.",
  subText: "Thickest business card",
  button: {
    label: "Get Sample",
    url: "/contact"
  }
};

import aboutThree1 from "@/images/service-bg-1-1.jpg";

export const AboutThreeData = {
  backgroundImage: aboutThree1,
  sectionContent: {
    subText: "Checkout our services",
    title: "Explore Printing \n Services",
    textAlignment: "left"
  },
  content:
    "We’re an online print and design company that is passionate about great design and the difference it can make to our customers and the world. \n \n We want to set a new standard for print, with remarkable new products that bring great design and uncompromising, high standards to the web.",
  button: {
    label: "Learn More",
    url: "/about"
  },
  phone: "000 8888 999",
  posts: [
    {
      title: "T-Shirt \nPrinting",
      icon: "printify-icon-t-shirt-with-square",
      url: "/service-details"
    },
    {
      title: "Flyer \nPrinting",
      icon: "printify-icon-brochure-folded",
      url: "/service-details"
    },
    {
      title: "Poster \n Printing",
      icon: "printify-icon-continuous-feed-paper",
      url: "/service-details"
    },
    {
      title: "Sticker  \n Printing",
      icon: "printify-icon-circular-sticker",
      url: "/service-details"
    }
  ]
};

import aboutTwo1 from "@/images/welcome-1-1.png";

export const AboutTwoData = {
  sectionContent: {
    subText: "Welcome to GSD Printing",
    title: "Dream it. Print it.",
    textAlignment: "left"
  },
  content:
    "When we say we’re not happy until you’re happy, we really do mean it. So whether it’s a typo or an image that didn’t print quite the way you hoped, we’ll do everything we can to \n fix it. \n \n We love great design and believe it can work wonders for every business. That’s why we make it simple to create beautiful, expertly crafted business stationery.",
  url: "/about",
  image: aboutTwo1
};

export const FaqData = {
  sectionContent: {
    subText: "Question and answers",
    title: "Frequently \nAsked Questions",
    textAlignment: "left"
  },
  posts: [
    {
      title: "Are all the cards on this page standard cards, with standard pricing? ",
      content:
        "That being said, you can also find some of our premium upgrades on this page. As you create your card, you’ll have the opportunity to upgrade your paper, shape or corner selection – or add a special finish. Our “preview” feature gives you an idea of how your design will look with the different options, and you can also see the pricing of those upgrades while you design."
    },
    {
      title: "I’m not sure how to make business cards online. How do I get started?",
      content:
        "Don’t worry – we make it easy. First, choose your thickness, stock, corners and quantity. If you click “Browse designs,” you’ll be taken to a gallery of designs. If you already have a custom business card design you want to use, click on “Upload design.” And if you have any questions, don’t hesitate to contact us."
    },
    {
      title: "What size are standard business cards? And how thick are they?",
      content:
        "Standard business cards are 3.5 and come in different thicknesses, measured in points. Each point (pt) is equal to .001 of an inch, to give you a frame of reference."
    },
    {
      title: "Is there an extra fee for printing on the back of the cards?",
      content:"There is an extra fee. We offer both grayscale and color options for backside business card printing."
    }
  ]
};

import featureCarousel1 from "@/images/we-belive-in-1-1.jpg";
import featureCarousel2 from "@/images/we-belive-in-1-2.jpg";

export const FeatureCarouselData = [
  {
    image: featureCarousel1,
    title: "We believe in the \n power of great \n design",
    text:
      "Design helps us stand out: from the clothes we wear, to the homes we live in, to the business cards we use. Design tells a story about \n us and what we stand for.",
    url: "/services"
  },
  {
    image: featureCarousel2,
    title: "We believe in the \n power of great \n design",
    text:
      "Design helps us stand out: from the clothes we wear, to the homes we live in, to the business cards we use. Design tells a story about \n us and what we stand for.",
    url: "/services"
  }
];

import team1 from "@/images/team-1-1.png";
import team2 from "@/images/team-1-2.png";
import team3 from "@/images/team-1-3.png";

export const TeamOneData = {
  sectionContent: {
    title: "Meet the Team",
    subText: "The leadership",
    content:
      "There are many variations of passages of lorem Ipsum available, but \nthe majority have suffered alteration in some form."
  },
  posts: [
    {
      name: "Harry Woods",
      designation: "Chief marketing officer",
      image: team1,
      content:
        "Jessica leads our customer team and holds guardianship of our brand. \n \n An award-winning marketer, Jesscia launched our Boston office, taking a huge step forward in making PRINTIFY a global brand. She’s responsible for our brand strategy and making sure we stay close to our customers. Jessica’s two big passions are the ocean and music. She has a formidable record library – with her purple vinyl of Purple Rain the jewel in her collection."
    },
    {
      name: "Myrtie Lyons",
      designation: "Chief marketing officer",
      image: team2,
      content:
        "Jessica leads our customer team and holds guardianship of our brand. \n \n An award-winning marketer, Jesscia launched our Boston office, taking a huge step forward in making PRINTIFY a global brand. She’s responsible for our brand strategy and making sure we stay close to our customers. Jessica’s two big passions are the ocean and music. She has a formidable record library – with her purple vinyl of Purple Rain the jewel in her collection."
    },
    {
      name: "Lida Doyle",
      designation: "Chief marketing officer",
      image: team3,
      content:
        "Jessica leads our customer team and holds guardianship of our brand. \n \n An award-winning marketer, Jesscia launched our Boston office, taking a huge step forward in making PRINTIFY a global brand. She’s responsible for our brand strategy and making sure we stay close to our customers. Jessica’s two big passions are the ocean and music. She has a formidable record library – with her purple vinyl of Purple Rain the jewel in her collection."
    }
  ]
};

import testimonials1 from "@/images/testi-1-1.jpg";
import testimonials2 from "@/images/testi-1-2.jpg";

export const TestimonialsOneData = [
  {
    image: testimonials1,
    content:
      "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch.",
    name: "Christine Eve"
  },
  {
    image: testimonials2,
    content:
      "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch.",
    name: "Mildred Rodriguez"
  }
];

import aboutOne1 from "@/images/about-1-1.jpg";
import aboutOne2 from "@/images/about-1-2.jpg";
import aboutOne3 from "@/images/about-1-3.jpg";

export const AboutOneData = [
  {
    title: "About Company",
    text:
      "Praesent dapibus eleifend augue eget ipsum sollicitudin velit malesuada eu liquam bland diam ac venenatis.",
    image: aboutOne1,
    url: "/services"
  },
  {
    title: "Our Promises",
    text:
      "Praesent dapibus eleifend augue eget ipsum sollicitudin velit malesuada eu liquam bland diam ac venenatis.",
    image: aboutOne2,
    url: "/contact"
  },
  {
    title: "How We Work",
    text:
      "Praesent dapibus eleifend augue eget ipsum sollicitudin velit malesuada eu liquam bland diam ac venenatis.",
    image: aboutOne3,
    url: "/pricing"
  }
];

import serviceDetails1 from "@/images/service-details-1-1.jpg";
import serviceDetails2 from "@/images/service-details-1-2.jpg";
import serviceDetails3 from "@/images/service-details-1-3.jpg";

export const ServiceDetailsData = [
  {
    image: serviceDetails1,
    title: "Surprisingly Affordable",
    lists: [
      "16–17 pt paper thickness",
      "A premium paper for less",
      "Also in Business Cards and Letterhead"
    ]
  },
  {
    image: serviceDetails2,
    title: "Available in Matte or Gloss",
    lists: [
      "Matte is shine free, so no glare",
      "Gloss makes colors really “pop”",
      "Both come at no extra cost"
    ]
  },
  {
    image: serviceDetails3,
    title: "Versatile Finish Options",
    lists: [
      "Coat both sides for extra protection",
      "Leave one side uncoated to write on",
      'Or get that "traditional" Postcard feel'
    ]
  }
];

export const ServiceTabOneData = [
  {
    title: "T-Shirt\n Printing",
    icon: "printify-icon-t-shirt-with-square",
    content: {
      title: "T-Shirt Printing",
      subText: "Our services",
      content:
        "Choose the perfect flyer design, You can’t go wrong. We start at premium and go all the way to extra fancy. There’s \nOriginal single-sided flyers (writeable on one side) that you can send without an envelope, Original double-sided \nflyers (more impactful) and luxe flyers (extra thick and luxurious)."
    }
  },
  {
    title: "Flyer \n Printing",
    icon: "printify-icon-brochure-folded",
    content: {
      title: "Flyer Printing",
      subText: "Our services",
      content:
        "Choose the perfect flyer design, You can’t go wrong. We start at premium and go all the way to extra fancy. There’s \n Original single-sided flyers (writeable on one side) that you can send without an envelope, Original double-sided \n flyers (more impactful) and luxe flyers (extra thick and luxurious)."
    }
  },
  {
    title: "Poster \n Printing",
    icon: "printify-icon-continuous-feed-paper",
    content: {
      title: "Poster Printing",
      subText: "Our services",
      content:
        "Choose the perfect flyer design, You can’t go wrong. We start at premium and go all the way to extra fancy. There’s \n Original single-sided flyers (writeable on one side) that you can send without an envelope, Original double-sided \n flyers (more impactful) and luxe flyers (extra thick and luxurious)."
    }
  },
  {
    title: "Sticker\n Printing",
    icon: "printify-icon-circular-sticker",
    content: {
      title: "Sticker \n  Printing",
      subText: "Our services",
      content:
        "Choose the perfect flyer design, You can’t go wrong. We start at premium and go all the way to extra fancy. There’s \n Original single-sided flyers (writeable on one side) that you can send without an envelope, Original double-sided \n flyers (more impactful) and luxe flyers (extra thick and luxurious)."
    }
  },
  {
    title: "Postcard \n Printing",
    icon: "printify-icon-white-sheets",
    content: {
      title: "Postcard Printing",
      subText: "Our services",
      content:
        "Choose the perfect flyer design, You can’t go wrong. We start at premium and go all the way to extra fancy. There’s \n Original single-sided flyers (writeable on one side) that you can send without an envelope, Original double-sided \n flyers (more impactful) and luxe flyers (extra thick and luxurious)."
    }
  }
];

export const FeatureTwoData = {
  sectionContent: {
    title: "Printify Unique \n Features ",
    subText: " Next printing level ",
    content:
      "Take your business cards, Flyers and Stickers to the next level with exclusive and innovative features."
  },
  posts: [
    {
      name: "Business \n Cards",
      url: "/service-details",
      icon: "printify-icon-white-sheets"
    },
    {
      name: "Flyer \n Printing",
      url: "/service-details",
      icon: "printify-icon-brochure-folded"
    },
    {
      name: "Sticker \n Printing",
      url: "/service-details",
      icon: "printify-icon-circular-sticker"
    }
  ]
};

import feature1 from "@/images/what-we-do-3-1.jpg";
import feature2 from "@/images/what-we-do-3-1-1.jpg";
import feature3 from "@/images/what-we-do-3-1-2.jpg";
import feature4 from "@/images/what-we-do-3-1-3.jpg";

export const FeatureOneData = {
  sectionContent: {
    title: "What We Do",
    subText: " Our features",
    content:
      "There are many variations of passages of lorem Ipsum available, but \n the majority have suffered alteration in some form."
  },
  posts: [
    {
      image: feature1,
      title: "We Make Every Card Unique",
      content:
        "Print a different image on the back of every single card at no upcharge. Watch the video for inspiration on how to get creative with Printfinity.",
      url: "/about"
    },
    {
      image: feature2,
      title: "Free Full-Color Printing",
      content:
        "Print full color on both sides of your business cards – it’s always included in the price.",
      url: "/about"
    },
    {
      image: feature3,
      title: "Rounded Corners for All",
      content:
        "Print full color on both sides of your business cards – it’s always included in the price.",
      url: "/about"
    },
    {
      image: feature4,
      title: "Satisfaction Guaranteed",
      content:
        "Print full color on both sides of your business cards – it’s always included in the price.",
      url: "/about"
    }
  ]
};

import serviceImage1 from "@/images/service-1-1.jpg";
import serviceImage2 from "@/images/service-1-2.jpg";
import serviceImage3 from "@/images/service-1-3.jpg";
import serviceImage4 from "@/images/service-1-4.jpg";
import serviceImage5 from "@/images/service-1-5.jpg";
import serviceImage6 from "@/images/service-1-6.jpg";

export const ServiceOneData = [
  {
    image: serviceImage1,
    title: "Business Cards",
    count: 50,
    price: 19.99,
    text:
      "Cut through the networking clutter and say hello with Printify Business Cards.",
    url: "/service-details"
  },
  {
    image: serviceImage2,
    title: "Postcards",
    count: 50,
    price: 19.99,
    text:
      "Cut through the networking clutter and say hello with Printify Business Cards.",
    url: "/service-details"
  },
  {
    image: serviceImage3,
    title: "Stickers and Labels",
    count: 50,
    price: 19.99,
    text:
      "Cut through the networking clutter and say hello with Printify Business Cards.",
    url: "/service-details"
  },
  {
    image: serviceImage4,
    title: "Flyers",
    count: 50,
    price: 19.99,
    text:
      "Cut through the networking clutter and say hello with Printify Business Cards.",
    url: "/service-details"
  },
  {
    image: serviceImage5,
    title: "Envelopes",
    count: 50,
    price: 19.99,
    text:
      "Cut through the networking clutter and say hello with Printify Business Cards.",
    url: "/service-details"
  },
  {
    image: serviceImage6,
    title: "Greeting Cards",
    count: 50,
    price: 19.99,
    text:
      "Cut through the networking clutter and say hello with Printify Business Cards.",
    url: "/service-details"
  }
];

import projectImage1 from "@/images/project-1-1.jpg";
import projectImage2 from "@/images/project-1-2.jpg";
import projectImage3 from "@/images/project-1-3.jpg";
import projectImage4 from "@/images/project-1-4.jpg";
import projectImage5 from "@/images/project-1-5.jpg";
import projectImage6 from "@/images/project-1-6.jpg";
export const ProjectOneData = [
  {
    image: projectImage1,
    category: "printing",
    title: "Thick Paper Book",
    url: "/project-details"
  },
  {
    image: projectImage2,
    category: "printing",
    title: "Ninety Nine You",
    url: "/project-details"
  },
  {
    image: projectImage3,
    category: "printing",
    title: "Colorful Photo Print",
    url: "/project-details"
  },
  {
    image: projectImage4,
    category: "printing",
    title: "Square Paper Book",
    url: "/project-details"
  },
  {
    image: projectImage5,
    category: "printing",
    title: "Book Copy",
    url: "/project-details"
  },
  {
    image: projectImage6,
    category: "printing",
    title: "C Creative Mess",
    url: "/project-details"
  }
];

import errorImage from "@/images/404-text.png";
export const errorData = {
  title: "Oops! This page is not available",
  text: "Please go back to home and try to find out once again.",
  image: errorImage
};

import progressImage1 from "@/images/what-we-do-2-1.jpg";

export const ProgressData = {
  sectionImage: progressImage1,
  sectionContent: {
    title: "You’ll get a \n perfect fit for \n your business.",
    subText: "What we do",
    content:
      "Handing out a business card is often the first impression people take of your business, so you need to get it right. Using your own photography or artwork to create custom business cards can help, and PRINTIFY makes the process easy with our simple online tools and templates."
  },
  posts: [
    {
      title: "Flyer \n Printing",
      price: "8.99",
      percentCount: "90"
    },
    {
      title: "Sticker \n Printing",
      price: "9.99",
      percentCount: "70"
    }
  ]
};

export const PricingData = {
  sectionContent: {
    title: "Plans & Pricing",
    subText: "Choose best plan",
    content:
      "There are many variations of passages of lorem Ipsum available, but \n the majority have suffered alteration in some form."
  },
  posts: [
    {
      name: "Standard plan",
      price: "25.00",
      icon: "printify-icon-continuous-feed-paper",
      url: "/contact",
      lists: [
        {
          name: "Rounded & Colored"
        },
        {
          name: "Preimum Paper"
        },
        {
          name: "Extra Thick"
        }
      ]
    },
    {
      name: "Premium plan",
      price: "35.00",
      icon: "printify-icon-brochure-folded",
      url: "/contact",
      lists: [
        {
          name: "Rounded & Colored"
        },
        {
          name: "Preimum Paper"
        },
        {
          name: "Extra Thick"
        }
      ]
    },
    {
      name: "Ultimate plan",
      price: "45.00",
      icon: "printify-icon-circular-sticker",
      url: "/contact",
      lists: [
        {
          name: "Rounded & Colored"
        },
        {
          name: "Preimum Paper"
        },
        {
          name: "Extra Thick"
        }
      ]
    }
  ]
};

import clientImage1 from "@/images/brand-1-1.png";
import clientImage2 from "@/images/brand-1-2.png";
import clientImage3 from "@/images/brand-1-3.png";
import clientImage4 from "@/images/brand-1-4.png";
import clientImage5 from "@/images/brand-1-5.png";

export const ClientCarouselData = [
  {
    image: clientImage1
  },
  {
    image: clientImage2
  },
  {
    image: clientImage3
  },
  {
    image: clientImage4
  },
  {
    image: clientImage5
  }
];

import sidebarImage from "@/images/widget-1-1.png";

export const sidebarTextWidgetData = {
  text:
    "Lorem Ipsum is simply dummy text of the rinting and typesetting industry has been the industry.",
  title: "Image with text",
  image: sidebarImage
};

import blogImage1 from "@/images/blog-1-1.jpg";
import blogImage2 from "@/images/blog-1-2.jpg";
import blogImage3 from "@/images/blog-1-3.jpg";
import blogImage4 from "@/images/blog-1-4.jpg";
import blogImage5 from "@/images/blog-1-5.jpg";
import blogImage6 from "@/images/blog-1-6.jpg";

export const BlogPostsData = [
  {
    title: "What final touches can i add",
    text:
      "We offer Letterpress, Spot Gloss, Raised Spot Gloss or Gold Foil. There are many people variation of passages of lorem Ipsum available in the majority alteration in some.",
    image: blogImage1,
    author: "admin",
    date: "20 March, 2018",
    commentCount: "3 Comments",
    url: "/blog-details"
  },
  {
    title: "How to brand a tattoo studio",
    text:
      "We offer Letterpress, Spot Gloss, Raised Spot Gloss or Gold Foil. There are many people variation of passages of lorem Ipsum available in the majority alteration in some.",
    image: blogImage2,
    author: "admin",
    date: "20 March, 2018",
    commentCount: "3 Comments",
    url: "/blog-details"
  },
  {
    title: "What file types do you accept",
    text:
      "We offer Letterpress, Spot Gloss, Raised Spot Gloss or Gold Foil. There are many people variation of passages of lorem Ipsum available in the majority alteration in some.",
    image: blogImage3,
    author: "admin",
    date: "20 March, 2018",
    commentCount: "3 Comments",
    url: "/blog-details"
  },
  {
    title: "Do you offer design services",
    text:
      "We offer Letterpress, Spot Gloss, Raised Spot Gloss or Gold Foil. There are many people variation of passages of lorem Ipsum available in the majority alteration in some.",
    image: blogImage4,
    author: "admin",
    date: "20 March, 2018",
    commentCount: "3 Comments",
    url: "/blog-details"
  },
  {
    title: "Bleed, trim and safe area",
    text:
      "We offer Letterpress, Spot Gloss, Raised Spot Gloss or Gold Foil. There are many people variation of passages of lorem Ipsum available in the majority alteration in some.",
    image: blogImage5,
    author: "admin",
    date: "20 March, 2018",
    commentCount: "3 Comments",
    url: "/blog-details"
  },
  {
    title: "Can I use my own logo",
    text:
      "We offer Letterpress, Spot Gloss, Raised Spot Gloss or Gold Foil. There are many people variation of passages of lorem Ipsum available in the majority alteration in some.",
    image: blogImage6,
    author: "admin",
    date: "20 March, 2018",
    commentCount: "3 Comments",
    url: "/blog-details"
  }
];

import blogDetailsImage1 from "@/images/blog-details-1-1.jpg";

export const BlogDetailsData = {
  title: "What final touches can i add",
  text:
    "We offer Letterpress, Spot Gloss, Raised Spot Gloss or Gold Foil. There are many people variation of passages of lorem Ipsum available in the majority alteration in some.",
  image: blogDetailsImage1,
  author: "admin",
  date: "20 March, 2018",
  commentCount: "3 Comments",
  url: "/blog-details"
};

import commentImage1 from "@/images/comment-1-1.png";
import commentImage2 from "@/images/comment-1-2.png";

export const BlogCommentData = {
  sectionContent: {
    title: "2 Comments",
    subText: "Read comments"
  },
  posts: [
    {
      image: commentImage1,
      title: "Jayme Secord",
      date: "20 Mar, 2018",
      time: "4:00 pm",
      content:
        "Lorem Ipsum is simply dummy text of the rinting and typesetting been the industry standard dummy text ever sincer nullam condimentum purus. In non ex at ligula fringilla lobortis et mauris auctor aliquet."
    },
    {
      image: commentImage2,
      title: "Lottie Golda",
      date: "20 Mar, 2018",
      time: "4:00 pm",
      content:
        "Lorem Ipsum is simply dummy text of the rinting and typesetting been the industry standard dummy text ever sincer nullam condimentum purus. In non ex at ligula fringilla lobortis et mauris auctor aliquet."
    }
  ]
};

export const CommentFromData = {
  sectionContent: {
    title: "Write comment",
    subText: "Leave Comment"
  }
};

export const ContactFromData = {
  sectionContent: {
    title: "Send Message",
    subText: "Contact with us"
  }
};

export const ContactInfosData = {
  sectionContent: {
    title: "Details",
    subText: "Contact info",
    textAlignment: "center"
  },
  posts: [
    {
      title: "Address",
      text: "88 New Street, Washington DC \n United States, America"
    },
    {
      title: "Phone",
      text: "Local: 222 999 888  \n  Mobile: 000 8888 999"
    },
    {
      title: "Email",
      text: "needhelp@printify.com  \n  inquiry@printify.com"
    },
    {
      title: "Follow",
      socials: [
        {
          icon: "fab fa-twitter",
          url: "#"
        },
        {
          icon: "fab fa-pinterest",
          url: "#"
        },
        {
          icon: "fab fa-facebook-f",
          url: "#"
        },
        {
          icon: "fab fa-youtube",
          url: "#"
        }
      ]
    }
  ]
};

export const FooterAboutData = {
  title: "About GSD Printing",
  text:
    "GSD Printing specializes in high-quality, efficient printing services tailored to meet the diverse needs of businesses and individuals. From vibrant marketing materials to detailed architectural plans, we offer a comprehensive range of printing solutions. "
};

export const FooterLinksData = {
  title: "Useful Links",
  links: [
    {
      label: "Home",
      url: "/"
    },
    {
      label: "Services",
      url: "/"
    },
    {
      label: "About",
      url: "/about"
    },
    {
      label: "Contact US",
      url: "/contact"
    },
   
    {
      label: "Blog",
      url: "/blog"
    },
   
  ]
};


export const FooterLinksDataTwo = {
  title: "Useful Links",
  links: [
    {
      label: "Business Cards",
      url: "/"
    },
    {
      label: "Postcards &amp; Print Advertising",
      url: "/"
    },
    {
      label: "Signs, Banners &amp; Posters",
      url: "/"
    },
    {
      label: "Labels, Stickers &amp; Packaging",
      url: "/"
    },
   
    {
      label: "Home & Gifts",
      url: "/"
    },
    {
      label: "Celebrations, Invitations &amp; Stationery",
      url: "/"
    },
    {
      label: "Wedding",
      url: "/"
    },
    {
      label: "Clothing & Bags",
      url: "/"
    },
    {
      label: "Design & Logo",
      url: "/"
    },
   
  ]
};
export const FooterPostsData = {
  title: "Our Services",
  posts: [
    {
      title: "A Clean Website Gives More Experience To The Visitors",
      date: "July 12, 2019",
      url: "/blog-details"
    },
    {
      title: "A Clean Website Gives More Experience To The Visitors",
      date: "July 12, 2019",
      url: "/blog-details"
    }
  ]
};

export const FooterContactData = {
  title: "Contact",
  infos: [
    {
      text: "000 7777 6666",
      url: "tel:000-8888-999"
    },
    {
      text: "info@gmail.com",
      url: "mailto:info@gmail.com"
    },
    {
      text: "456 Park Avenue, New York, NY 10022",
      url: ""
    }
  ]
};

export const FooterBottomData = {
  social: [
    {
      icon: "fab fa-twitter",
      url: "#"
    },
    {
      icon: "fab fa-pinterest",
      url: "#"
    },
    {
      icon: "fab fa-facebook-f",
      url: "#"
    },
    {
      icon: "fab fa-youtube",
      url: "#"
    }
  ]
};
