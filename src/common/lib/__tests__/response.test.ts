import { ApiResponse } from '@/common/model/api-response';
import { Response } from 'express';
import { sendResponse } from '../response';

describe('response', () => {
  it('should build and send response using ApiResponse', () => {
    // Given
    const statusMock = jest.fn();
    const sendMock = jest.fn();
    const mockResponse: Response = {
      status: statusMock.mockReturnThis(),
      send: sendMock,
    } as any;

    const mockApiResponse: ApiResponse<{ message: string }> = {
      message: 'Hello World',
    };

    // When
    sendResponse(mockResponse, 200, mockApiResponse);

    // Then
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(mockApiResponse);
  });
});
