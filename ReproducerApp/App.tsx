/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Button,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';

const Input = ({}, ref: Ref<TextInput>) => {
  const textInputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      if (!textInputRef.current) {
        throw Error('Ref is not ready');
      }
      return {
        focus: () => {
          textInputRef.current.focus();
        },
      };
    },
    [],
  );

  return <TextInput ref={textInputRef} placeholder="Text Input" />;
};

const InputWithRef = React.forwardRef(Input);

const Parent = () => {
  const ref = useRef(null);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (showInput) {
      ref.current.focus();
    }
  }, [showInput]);

  return (
    <View style={{backgroundColor: 'green', padding: 20}}>
      {showInput && <InputWithRef ref={ref} />}
      <Button title="Toggle Input" onPress={() => setShowInput(p => !p)} />
    </View>
  );
};
function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: 'grey',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <Parent />
      </View>
    </SafeAreaView>
  );
}

export default App;
