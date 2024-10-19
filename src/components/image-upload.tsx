import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import { Cloudinary } from "cloudinary-core";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: any;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const cloudinaryRef = useRef<Cloudinary | null>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    // Load the Cloudinary script
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.async = true;
    script.onload = () => {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: "dhgg72vfy",
          uploadPreset: "motherlove",
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            onChange(result.info.secure_url);
          } else if (error) {
            console.error("Error uploading image:", error);
          }
        }
      );
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [onChange]);
  const images = Array.isArray(value) ? value : [];
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {images.map((url, index) => (
          <div
            key={index}
            className="relative w-[300px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <img
              src={url}
              alt="Uploaded"
              className="object-cover shadow-inner rounded-md border-solid border-2 border-gray-100 w-full h-full"
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        disabled={disabled}
        variant="secondary"
        onClick={() => widgetRef.current.open()}
      >
        <ImagePlus className="h-4 w-4 mr-2" />
        Upload an Image
      </Button>
    </div>
  );
};

export default ImageUpload;
