import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from 'react-hook-form';
import { Input as ChakraInput, FormControl, FormLabel, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({ name, label, error = null, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {!!label && 
          <FormLabel htmlFor={name}>{label}</FormLabel>
        }
        <ChakraInput
          _autofill={{
            WebkitBoxShadow: '0 0 0 1000px #181B23 inset',
            WebkitTextFillColor: 'white',
            caretColor: 'white',
            transition: 'background-color 5000s ease-in-out 0s',
            _active: {
              borderColor: 'pink.500'
            }

          }}
          name={name}
          id={name}
          focusBorderColor="pink.500"
          bg="gray.900"
          variant="filled"
          _hover={{
            bg: "gray.900"
          }}
          size="lg"
          ref={ref}
          {...rest}
        />
        {!!error && 
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        }
      </FormControl>
    );
}

export const Input = forwardRef(InputBase);