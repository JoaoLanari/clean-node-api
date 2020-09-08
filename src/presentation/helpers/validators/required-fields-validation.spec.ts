import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../erros'

describe('RequiredFiled Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('filed')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('filed'))
  })
})
