import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        nav: {
          brand: "NoteMyWords",
          language: "中文"
        },
        home: {
          headline: "Book a singer to elevate your wedding!",
          bookNow: "Book Now"
        },
        contact: {
          title: "Contact Us",
          subtitle: "Leave us a comment or question",
          name: "Name",
          email: "Email",
          comments: "Comments/Questions",
          submit: "Submit"
        },
        footer: {
          tagline: "Musical Entertainment for Happy Marriages.",
          copyright: "© 2026 NoteMyWords. All rights reserved.",
          concerns: "Have any Concerns?",
          contactUs: "Contact Us"
        },
        browse: {
          filter: "Filter",
          removeAll: "Remove all",
          availability: "Availability",
          weekdays: "Weekdays",
          weekends: "Weekends",
          price: "Price",
          musicType: "Type of Music",
          searchPlaceholder: "Enter singer name",
          available: "Available",
          learnMore: "Learn More",
          bookNow: "Book Now",
          noResults: "No singers match your filters."
        },
        detail: {
          notFound: "Singer not found.",
          backToBrowse: "Back to Browse",
          availability: "Availability",
          genres: "Genres",
          price: "Price",
          location: "Location",
          languages: "Languages",
          experience: "Experience",
          bio: "Bio",
          bookNow: "Book Now",
          perHour: "/hour"
        },
        booking: {
          notFound: "Singer not found.",
          backToBrowse: "Back to Browse",
          pickDateTime: "Pick a Date and Time",
          selectDate: "Select a Date:",
          selectTime: "Select a Time:",
          selectTimeSlot: "Select a time slot",
          time1: "1:00 PM - 5:00 PM",
          time2: "6:00 PM - 10:00 PM",
          bookingForm: "Booking Form",
          yourInfo: "Your Information",
          firstName: "First Name:",
          lastName: "Last Name:",
          phone: "Phone Number (no space):",
          phoneNote: "10-digit number only.",
          paymentInfo: "Your Payment Information",
          cardNumber: "Card Number (16 digits, no spaces):",
          expiryDate: "Expiry Date:",
          cvc: "CVV:",
          cardName: "Name on Card:",
          confirmBooking: "Confirm Booking",
          confirmation: "Booking Confirmation",
          bookedSuccess: "You've booked successfully!",
          singer: "Singer:",
          name: "Name:",
          phoneLabel: "Phone:",
          date: "Date:",
          time: "Time:",
          location: "Location:",
          close: "Close",
          errorChooseDate: "Please choose an event date.",
          errorNotAvailable: "The selected date is not available.",
          errorPhone: "Phone number must be exactly 10 digits with no spaces.",
          errorCard: "Card number must be exactly 16 digits.",
          errorCvc: "CVV must be exactly 3 digits.",
          errorExpiry: "Expiry date must be in MM/YY format and later than the current date.",
          errorTime: "Please select a time slot.",
          weekdaysOnly: "{{name}} is only available on weekdays.",
          weekendsOnly: "{{name}} is only available on weekends."
        }
      }
    },
    zh: {
      translation: {
        nav: {
          brand: "樂語之聲",
          language: "EN"
        },
        home: {
          headline: "預約歌手，讓你的婚禮更精彩！",
          bookNow: "立即預約"
        },
        contact: {
          title: "聯絡我們",
          subtitle: "歡迎留下你的問題或意見",
          name: "姓名",
          email: "電郵",
          comments: "意見／問題",
          submit: "提交"
        },
        footer: {
          tagline: "為幸福婚禮帶來音樂演出。",
          copyright: "© 2026 NoteMyWords. 版權所有。",
          concerns: "有任何疑問嗎？",
          contactUs: "聯絡我們"
        },
        browse: {
          filter: "篩選",
          removeAll: "清除全部",
          availability: "可預約時段",
          weekdays: "平日",
          weekends: "週末",
          price: "價格",
          musicType: "音樂類型",
          searchPlaceholder: "輸入歌手名字",
          available: "可於",
          learnMore: "了解更多",
          bookNow: "立即預約",
          noResults: "沒有符合篩選條件的歌手。"
        },
        detail: {
          notFound: "找不到歌手。",
          backToBrowse: "返回歌手列表",
          availability: "可預約時段",
          genres: "音樂類型",
          price: "價格",
          location: "地點",
          languages: "語言",
          experience: "經驗",
          bio: "簡介",
          bookNow: "立即預約",
          perHour: "/小時"
        },
        booking: {
          notFound: "找不到歌手。",
          backToBrowse: "返回歌手列表",
          pickDateTime: "選擇日期和時間",
          selectDate: "選擇日期：",
          selectTime: "選擇時間：",
          selectTimeSlot: "選擇時段",
          time1: "下午 1:00 - 5:00",
          time2: "晚上 6:00 - 10:00",
          bookingForm: "預約表格",
          yourInfo: "你的資料",
          firstName: "名字：",
          lastName: "姓氏：",
          phone: "電話號碼（不要空格）：",
          phoneNote: "只限 10 位數字。",
          paymentInfo: "付款資料",
          cardNumber: "信用卡號碼（16位，不要空格）：",
          expiryDate: "到期日：",
          cvc: "CVV：",
          cardName: "持卡人姓名：",
          confirmBooking: "確認預約",
          confirmation: "預約確認",
          bookedSuccess: "你已成功預約！",
          singer: "歌手：",
          name: "姓名：",
          phoneLabel: "電話：",
          date: "日期：",
          time: "時間：",
          location: "地點：",
          close: "關閉",
          errorChooseDate: "請選擇活動日期。",
          errorNotAvailable: "所選日期無法預約。",
          errorPhone: "電話號碼必須為 10 位數字，且不能有空格。",
          errorCard: "信用卡號碼必須為 16 位數字。",
          errorCvc: "CVV 必須為 3 位數字。",
          errorExpiry: "到期日必須為 MM/YY 格式，且晚於目前日期。",
          errorTime: "請選擇時段。",
          weekdaysOnly: "{{name}} 只接受平日預約。",
          weekendsOnly: "{{name}} 只接受週末預約。"
        }
      }
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;