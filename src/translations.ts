interface Translation {
  checkingLight: string;
  checkingAngle: string;
  checkingMic: string;
  checkingInternet: string;
  micWorking: string;
  micError: string;
  internetGood: string;
  internetBad: string;
  lightTooLow: string;
  lightTooHigh: string;
  lightGood: string;
  angleAdjust: string;
  angleGood: string;
  lighting: string;
  cameraAngle: string;
  microphone: string;
  internet: string;
  tips: string;
  tipsList: string[];
}

interface Translations {
  [key: string]: Translation;
}

export const translations: Translations = {
  en: {
    checkingLight: 'Checking light level...',
    checkingAngle: 'Checking camera angle...',
    checkingMic: 'Checking microphone...',
    checkingInternet: 'Checking internet connection...',
    micWorking: 'Microphone is working',
    micError: 'Could not access microphone',
    internetGood: 'Internet connection is good',
    internetBad: 'Internet connection is weak or disconnected',
    lightTooLow: 'Insufficient lighting. Move to a brighter area.',
    lightTooHigh: 'Too much light. Reduce lighting.',
    lightGood: 'Light level is ideal!',
    angleAdjust: 'Adjust camera to eye level.',
    angleGood: 'Camera angle is ideal!',
    lighting: 'Lighting',
    cameraAngle: 'Camera Angle',
    microphone: 'Microphone',
    internet: 'Internet',
    tips: 'Tips',
    tipsList: [
      'Keep your camera at eye level',
      'Avoid windows behind you',
      'Ensure proper lighting on your face',
      'Check that your background is tidy',
      'Speak a few words to test your microphone',
      'Use a wired connection for stable internet'
    ]
  },
  tr: {
    checkingLight: 'Işık seviyesi kontrol ediliyor...',
    checkingAngle: 'Kamera açısı kontrol ediliyor...',
    checkingMic: 'Mikrofon kontrol ediliyor...',
    checkingInternet: 'İnternet bağlantısı kontrol ediliyor...',
    micWorking: 'Mikrofon çalışıyor',
    micError: 'Mikrofona erişilemedi',
    internetGood: 'İnternet bağlantısı iyi',
    internetBad: 'İnternet bağlantısı zayıf veya kesik',
    lightTooLow: 'Yetersiz ışık. Daha aydınlık bir alana geçin.',
    lightTooHigh: 'Çok fazla ışık var. Işığı azaltın.',
    lightGood: 'Işık seviyesi ideal!',
    angleAdjust: 'Kamerayı göz hizasına getirin.',
    angleGood: 'Kamera açısı ideal!',
    lighting: 'Işıklandırma',
    cameraAngle: 'Kamera Açısı',
    microphone: 'Mikrofon',
    internet: 'İnternet',
    tips: 'İpuçları',
    tipsList: [
      'Kameranızı göz hizasında tutun',
      'Arkanızda pencere olmamasına dikkat edin',
      'Yüzünüze düzgün ışık geldiğinden emin olun',
      'Arka planınızın düzenli olduğunu kontrol edin',
      'Mikrofonunuzu test etmek için birkaç kelime söyleyin',
      'Stabil bir internet bağlantısı için kablolu ağı tercih edin'
    ]
  }
};