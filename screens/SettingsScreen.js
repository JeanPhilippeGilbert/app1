
import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { PersonContext } from '../context/PersonContext';

export default function SettingsScreen({ navigation }) {
  const { person, setPerson } = useContext(PersonContext);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(person.couleur);
  const [items, setItems] = React.useState([
    { label: 'Blanc', value: '#ffffff' },
    { label: 'Bleu', value: '#add8e6' },
    { label: 'Vert', value: '#90ee90' },
    { label: 'Jaune', value: '#ffffe0' },
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: person.nom });
  }, [navigation, person.nom]);

  React.useEffect(() => {
    setPerson({ ...person, couleur: value });
  }, [value]);

  return (
    <View style={{...styles.container, backgroundColor: person?.couleur || '#ffffff'}}>
      <Text>Modifier la couleur de fond</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});