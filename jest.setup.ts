import { server } from '@/app/api/mocks/server';
import '@testing-library/jest-dom';

jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(() => ({
    getToken: jest.fn(() => Promise.resolve('mock-token')),
  })),
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
