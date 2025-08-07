import { describe, it, expect } from 'bun:test';
import React from 'react';
import { render } from '@testing-library/react';
import { FileUpload } from '../components/FileUpload';

describe('FileUpload component', () => {
  it('should render without crashing', () => {
    const { container } = render(<FileUpload onUpload={() => {}} isProcessing={false} />);
    expect(container).toBeDefined();
  });
});
