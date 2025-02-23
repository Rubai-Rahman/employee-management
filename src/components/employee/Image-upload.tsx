'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    maxFiles: 1,
  });

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="flex flex-col items-center">
      {preview ? (
        <div className="relative">
          <Image
            width={32}
            height={32}
            src={preview || '/placeholder.svg'}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            className="absolute top-0 right-0"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="text-sm text-gray-500">Upload Image</p>
        </div>
      )}
      {!preview && (
        <Button
          type="button"
          variant="secondary-ghost"
          className="mt-2"
          {...getRootProps()}
        >
          Select Image
        </Button>
      )}
    </div>
  );
}
