import React, { useEffect, useRef } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

// 🧾 Định nghĩa kiểu cho props
interface PdfViewerProps {
  sourcePDF: any;
  scale?: number;
  onPageChanged?: (page: number, numberOfPages: number) => void;
  onRefReady?: (ref: any) => void;
  onLoadComplete?: (numberOfPages: number, filePath: string) => void;
  onError?: (error: any) => void;
}

const PdfViewerComponent: React.FC<PdfViewerProps> = ({
  sourcePDF,
  scale = 1.0,
  onPageChanged,
  onRefReady,
  onLoadComplete,
  onError,
}) => {
  const pdfRef = useRef(null);

  useEffect(() => {
    if (pdfRef.current && onRefReady) {
      onRefReady(pdfRef.current);
    }
  }, [pdfRef.current, onRefReady]);

  if (!sourcePDF) return null;

  return (
    <Pdf
      ref={pdfRef}
      trustAllCerts={false}
      source={sourcePDF}
      scale={scale}
      onLoadComplete={(numberOfPages, filePath) => {
        onLoadComplete?.(numberOfPages, filePath);
      }}
      onPageChanged={(page, numberOfPages) => {
        onPageChanged?.(page, numberOfPages);
      }}
      onError={(error) => {
        console.error(error);
        onError?.(error);
      }}
      style={styles.pdf}
    />
  );
};

const PdfViewer = React.memo(PdfViewerComponent, (prevProps, nextProps) => {
  return (
    prevProps.sourcePDF === nextProps.sourcePDF &&
    prevProps.scale === nextProps.scale
  );
});

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: '100%'
  }
});

export default PdfViewerComponent;
