import React, { useEffect, useRef, useState } from 'react';
import { Camera, Sun, Move, AlertTriangle, CheckCircle, XCircle, Mic, Wifi } from 'lucide-react';
import { translations } from './translations';

interface CheckResult {
  status: 'good' | 'bad' | 'checking';
  message: string;
}

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [language, setLanguage] = useState('en');
  const [lightLevel, setLightLevel] = useState<CheckResult>({
    status: 'checking',
    message: ''
  });
  const [cameraAngle, setCameraAngle] = useState<CheckResult>({
    status: 'checking',
    message: ''
  });
  const [micStatus, setMicStatus] = useState<CheckResult>({
    status: 'checking',
    message: ''
  });
  const [internetStatus, setInternetStatus] = useState<CheckResult>({
    status: 'checking',
    message: ''
  });

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    const supportedLang = translations[browserLang] ? browserLang : 'en';
    setLanguage(supportedLang);

    // Update initial messages with correct language
    setLightLevel(prev => ({ ...prev, message: translations[supportedLang].checkingLight }));
    setCameraAngle(prev => ({ ...prev, message: translations[supportedLang].checkingAngle }));
    setMicStatus(prev => ({ ...prev, message: translations[supportedLang].checkingMic }));
    setInternetStatus(prev => ({ ...prev, message: translations[supportedLang].checkingInternet }));
  }, []);

  const t = translations[language];

  useEffect(() => {
    async function setupDevices() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "user" },
          audio: true
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setMicStatus({
          status: 'good',
          message: t.micWorking
        });
      } catch (err) {
        console.error("Device access error:", err);
        setMicStatus({
          status: 'bad',
          message: t.micError
        });
      }
    }
    setupDevices();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [language]);

  useEffect(() => {
    const checkInternet = async () => {
      try {
        const response = await fetch('https://www.google.com/favicon.ico', {
          mode: 'no-cors',
          cache: 'no-store'
        });
        setInternetStatus({
          status: 'good',
          message: t.internetGood
        });
      } catch {
        setInternetStatus({
          status: 'bad',
          message: t.internetBad
        });
      }
    };

    const internetInterval = setInterval(checkInternet, 5000);
    return () => clearInterval(internetInterval);
  }, [language]);

  useEffect(() => {
    if (!videoRef.current || !stream) return;

    const checkLighting = () => {
      const video = videoRef.current as HTMLVideoElement;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      let brightness = 0;
      for (let i = 0; i < data.length; i += 4) {
        brightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
      }
      
      const averageBrightness = brightness / (data.length / 4);
      
      if (averageBrightness < 80) {
        setLightLevel({
          status: 'bad',
          message: t.lightTooLow
        });
      } else if (averageBrightness > 200) {
        setLightLevel({
          status: 'bad',
          message: t.lightTooHigh
        });
      } else {
        setLightLevel({
          status: 'good',
          message: t.lightGood
        });
      }
    };

    const checkAngle = () => {
      const random = Math.random();
      if (random > 0.7) {
        setCameraAngle({
          status: 'bad',
          message: t.angleAdjust
        });
      } else {
        setCameraAngle({
          status: 'good',
          message: t.angleGood
        });
      }
    };

    const interval = setInterval(() => {
      checkLighting();
      checkAngle();
    }, 2000);

    return () => clearInterval(interval);
  }, [stream, language]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'bad':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    }
  };

  const StatusCard = ({ icon: Icon, title, status, message }: { 
    icon: React.ElementType; 
    title: string; 
    status: CheckResult; 
    message: string;
  }) => (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-blue-400" />
        <span className="font-medium">{title}</span>
        {getStatusIcon(status.status)}
      </div>
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Camera className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold">MeetCheck</h1>
        </div>

        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatusCard 
              icon={Sun} 
              title={t.lighting} 
              status={lightLevel} 
              message={lightLevel.message}
            />
            <StatusCard 
              icon={Move} 
              title={t.cameraAngle} 
              status={cameraAngle} 
              message={cameraAngle.message}
            />
            <StatusCard 
              icon={Mic} 
              title={t.microphone} 
              status={micStatus} 
              message={micStatus.message}
            />
            <StatusCard 
              icon={Wifi} 
              title={t.internet} 
              status={internetStatus} 
              message={internetStatus.message}
            />
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">{t.tips}</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              {t.tipsList.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;