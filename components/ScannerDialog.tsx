import React, { useState } from 'react';
import { X, Camera, Scan } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface ScannerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (isbn: string) => void;
}

export function ScannerDialog({ isOpen, onClose, onScan }: ScannerDialogProps) {
  const [manualISBN, setManualISBN] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);

  if (!isOpen) return null;

  const handleManualSubmit = () => {
    if (manualISBN.trim()) {
      onScan(manualISBN.trim());
      setManualISBN('');
      onClose();
    }
  };

  const handleCameraTest = () => {
    setIsCameraActive(true);
    // Simulate camera scan after 2 seconds
    setTimeout(() => {
      const testISBN = '978-956-00-0001';
      onScan(testISBN);
      setIsCameraActive(false);
      onClose();
    }, 2000);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-xl max-w-md w-full shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <Scan className="w-6 h-6 text-primary-600" />
              <h5>Escanear ISBN</h5>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Camera view */}
            <div className="mb-6">
              <div className="relative aspect-video bg-neutral-900 rounded-xl overflow-hidden flex items-center justify-center">
                {isCameraActive ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Camera className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                      <p>Escaneando código...</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-neutral-400 text-center">
                    <Camera className="w-12 h-12 mx-auto mb-2" />
                    <p className="caption">Vista de cámara</p>
                    <p className="text-xs mt-1">Presiona "Probar cámara" para iniciar</p>
                  </div>
                )}
                
                {/* Scanning reticle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-32 border-2 border-primary-500 rounded-lg relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-primary-500"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-primary-500"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-primary-500"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-primary-500"></div>
                  </div>
                </div>
              </div>

              <Button
                variant="secondary"
                fullWidth
                onClick={handleCameraTest}
                className="mt-3"
                disabled={isCameraActive}
              >
                <Camera className="w-5 h-5" />
                {isCameraActive ? 'Escaneando...' : 'Probar cámara'}
              </Button>
            </div>

            {/* Manual input */}
            <div className="border-t border-neutral-200 pt-6">
              <p className="caption text-neutral-600 mb-3">O ingresa el código manualmente:</p>
              <div className="flex gap-2">
                <Input
                  placeholder="978-956-00-0000"
                  value={manualISBN}
                  onChange={(e) => setManualISBN(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
                />
                <Button onClick={handleManualSubmit} disabled={!manualISBN.trim()}>
                  Usar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
