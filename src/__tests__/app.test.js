import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../app'

const server = setupServer(
  rest.get('*', (request, response, ctx) => {
    console.log(response)
    return response(ctx.json({results: [{headers: 'headers', count: '100', results: 'test results'}]}))
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Should render our App', async () => {
  render(<App />)

  let goButton = screen.getByTestId('go-button');
  fireEvent.submit(goButton);

  // let testResult = await screen.findByText(/100/im);
  
  // expect(testResult).toBeInTheDocument();

});