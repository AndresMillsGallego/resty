import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../app'

const data = {
  headers: 'test-headers',
  count: '100',
  results: [{results: 'test results'}]
}

const server = setupServer(
  rest.get('*', (request, response, ctx) => {
    return response(ctx.json(data))
  }),
);

beforeAll(() => server.listen());

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
  
    
    let results = await screen.findByText(/count/);
    console.log(results)
    expect(results).toBeTruthy();
    expect(results).toBeInTheDocument(); 
  
  });

})