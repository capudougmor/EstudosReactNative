import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

// import { Container } from './styles';

const Main = () => {
  const membersURL = 'https://api.github.com/orgs/rocketseat/members'

  const [isLoading, setIsLoading] = useState(true)
  const [members, setMembers] = useState([])

  useEffect(() => {
    fetch(membersURL)
      .then( res => res.json())
      .then( data => setMembers(data))
      .catch((error) => alert(error))
      .finally(setIsLoading(false))

    }, [])
    console.log(members)

  return (
    <View>
      {isLoading ? <ActivityIndicator /> : <FlatList
          contentContainerStyle={{padding: 20}}
          data={members}
          keyExtractor={({ id }, index) => id}
          renderItem={({item}) => (
            <View style={styles.members}>
              <Image style={styles.image} source={item.avatar_url}  />
              <Text  >ok{item.login}</Text>
            </View>
          )}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({

  members: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  image: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginRight: 10,
  }
})

export default Main;