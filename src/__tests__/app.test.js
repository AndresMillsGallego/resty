import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../app'

const server = setupServer(
  rest.get('*', (request, response, ctx) => {
    return response(ctx.json({
      results: {
        headers: {
          dataType: 'application/json'
        },
        data: {
          count: 100,
          results: [{name: 'test'}],
        }
      }
    }))
  }),
);

beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Testing our main App and API call', () => {

  test('Should render our App as well as the results from the API call', async () => {
    render(<App />)
  
    let inputUrl = screen.getByTestId('test-url');
    fireEvent.change(inputUrl, {target: {value: "http://doesntexist.com"}})

    let testMethod = screen.getByTestId('test-method');
    fireEvent.click(testMethod, {target: {id: 'get'}})

    let goButton = screen.getByTestId('go-button');
    fireEvent.click(goButton);
  
    // await waitFor(() => screen.getByRole('JSONPretty', {name: /results/i}))
    
    // expect(screen.getByRole('JSONPretty', {name: /results/i})).toHaveTextContent('count');

    let results = await screen.findByText(/test/);
    console.log(results)
    expect(results).toBeTruthy();
    expect(results).toBeInTheDocument(); 
  
  });

})