import React, { useEffect, useMemo, useState } from 'react';

export default function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  const diagnosis = useMemo(() => {
    if (!selectedFile) return null;

    const fileName = (selectedFile.name || '').toLowerCase();

    if (fileName.includes('tomato_blight')) {
      return {
        name: 'Tomato Blight',
        recommendation:
          'Remove infected leaves, apply copper fungicide, ensure good air circulation.',
      };
    }

    if (fileName.includes('rice_blast')) {
      return {
        name: 'Rice Blast',
        recommendation:
          'Use resistant varieties, apply balanced fertilizer, avoid excessive nitrogen.',
      };
    }

    if (fileName.includes('powdery_mildew')) {
      return {
        name: 'Powdery Mildew',
        recommendation:
          'Spray neem oil or sulfur fungicide, improve ventilation, avoid overhead watering.',
      };
    }

    return {
      name: 'Unknown Disease',
      recommendation: 'Please consult an expert or upload a clearer image.',
    };
  }, [selectedFile]);

  function handleFileChange(e) {
    const file = e?.target?.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setImagePreviewUrl('');
      return;
    }
    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setImagePreviewUrl(url);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Plant Disease Detection</h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload a plant leaf or fruit image. Detection is based on the filename.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="w-full">
              <label
                htmlFor="image-upload"
                className="block w-full cursor-pointer rounded-xl border border-dashed border-gray-300 bg-gray-50/60 p-6 text-center hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8 text-gray-500"
                  >
                    <path d="M19.5 14.25v-2.5a7.25 7.25 0 10-14.5 0v2.5m14.5 0l1.5-1.5m-1.5 1.5l-1.5-1.5M6 18.75h12A2.25 2.25 0 0020.25 16.5v-5.75A2.25 2.25 0 0018 8.5H6a2.25 2.25 0 00-2.25 2.25V16.5A2.25 2.25 0 006 18.75z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-800">Click to upload image</span>
                  <span className="text-xs text-gray-500">PNG, JPG up to 10MB</span>
                </div>
                <input
                  id="image-upload"
                  name="image-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>

              {selectedFile && (
                <p className="mt-3 truncate text-center text-xs text-gray-600">
                  Selected file:{' '}
                  <span className="font-medium text-gray-800">{selectedFile.name}</span>
                </p>
              )}
            </div>

            {imagePreviewUrl && (
              <div className="w-full">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <img
                    src={imagePreviewUrl}
                    alt="Uploaded preview"
                    className="block max-h-96 w-full object-contain bg-gray-50"
                  />
                </div>
              </div>
            )}

            {diagnosis && (
              <div className="w-full">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">Diagnosis</h2>
                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-gray-900">Disease:</span> {diagnosis.name}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-gray-900">Recommendation:</span>{' '}
                      {diagnosis.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}