describe('Example Component', () => {

  test('Debe ser mayor a 10', () => {

    //Arreglar (Arrange)
    let value = 10;

    //Estímulo (Act)
    value = value + 2;

    //Observar el resultado (Assert)
      expect(value).toBeGreaterThan(10)
  });

});