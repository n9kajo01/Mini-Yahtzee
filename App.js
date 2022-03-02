import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


let gameFinished = false;


export default function App() {
  const [dice, setDice] = useState([]);
  const [lockedDice, setLockedDice] = useState([]);
  const [points, setPoints] = useState(0);
  const [throws, setThrows] = useState(3);
  const [turnEndPoints, setTurnEndPoints] = useState([0, 0, 0, 0, 0, 0]);
  const [disabledPoints, setDisabledPoints] = useState([false, false, false, false, false, false])
  const [buttonText, setButtonText] = useState("Roll dice")
  const [bonus, setBonus] = useState("")

  useEffect(() => {
    if (points === 0) {
      setBonus("Get 63 total for bonus points")
    } else if (points < 63) {
      setBonus("You are " + (63 - points) + " points away from bonus")
    } else {
      setBonus("You got the bonus points")
    }
  }, [points])


  let img = [
    "dice-1-outline",
    "dice-2-outline",
    "dice-3-outline",
    "dice-4-outline",
    "dice-5-outline",
    "dice-6-outline"
  ];

  function SelectDice(i) {
    if (throws === 3) {
      alert("Throw Dice first!");
    } else {
      let newLockedDice = lockedDice;
      if (!lockedDice.includes(i)) {
        newLockedDice.push(i);
        setLockedDice(newLockedDice);
      } else {
        newLockedDice = newLockedDice.filter(function (e) {
          return e !== i;
        });
        setLockedDice(newLockedDice);
      }
    }
  }

  function ThrowDice() {
    if (gameFinished == true) {
      gameFinished = false
      setDisabledPoints([false, false, false, false, false, false])
      setThrows(3);
      setLockedDice([]);
      setDice([]);
      setPoints(0)
      setTurnEndPoints([0, 0, 0, 0, 0, 0])
      setButtonText("Roll dice")
    } else if (throws > 0) {
      setThrows(throws - 1);
      let newDice = [];
      for (let i = 0; i < 5; i++) {
        if (!lockedDice.includes(i)) {
          let randomNumber = Math.floor(Math.random() * 6);
          newDice.push({
            id: i,
            img: img[randomNumber],
            num: randomNumber + 1,
          });
        } else {
          newDice[i] = dice[i];
        }
      }
      setDice(newDice);
    }
  }

  function SelectPoints(i) {
    let newPoints = [];
    let a = points;
    let newTurnEndPoints = turnEndPoints

    if (throws !== 0) {
    } else {

      let newDisabledPoints = disabledPoints
      newDisabledPoints[i] = true;
      setDisabledPoints(newDisabledPoints)
      {
        dice.map((item) => newPoints.push(item.num));
      }
      for (let j = 0; j < 5; j++) {
        if (newPoints[j] === i + 1) {
          a += newPoints[j];
          newTurnEndPoints[i] += newPoints[j]
        }
        setTurnEndPoints(newTurnEndPoints)
        setPoints(a);

      }
      NewTurn();
    }

  }
  function NewTurn() {
    if (disabledPoints.every(x => x === true)) {
      setButtonText("New game")
      gameFinished = true
    } else {
      setThrows(3);
      setLockedDice([]);
      setDice([]);
    }

  }

  return (
    <View style={styles.container}>´
      <Text style={styles.title}>Mini Yahtzee</Text>
      <View style={styles.dice_container}>
        {dice.map((item) => (
          <TouchableOpacity onPress={(e) => SelectDice(item.id)} key={item.id}>
            <Icon size={40} name={item.img} />
          </TouchableOpacity>
        ))}

        <StatusBar style="auto" />
      </View>
      <Text>Throws left: {throws}</Text>
      <Button title={buttonText} onPress={(e) => ThrowDice()} />
      <Text>Total: {points}</Text>
      <Text>{bonus}</Text>
      <View style={styles.points}>
        <TouchableOpacity onPress={(e) => SelectPoints(0)} disabled={disabledPoints[0]}>
          <Text style={styles.points_text}>{turnEndPoints[0]}</Text>
          <Icon name="numeric-1-box-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={(e) => SelectPoints(1)} disabled={disabledPoints[1]}>
          <Text style={styles.points_text}>{turnEndPoints[1]}</Text>
          <Icon name="numeric-2-box-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={(e) => SelectPoints(2)} disabled={disabledPoints[2]}>
          <Text style={styles.points_text}>{turnEndPoints[2]}</Text>
          <Icon name="numeric-3-box-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={(e) => SelectPoints(3)} disabled={disabledPoints[3]}>
          <Text style={styles.points_text}>{turnEndPoints[3]}</Text>
          <Icon name="numeric-4-box-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={(e) => SelectPoints(4)} disabled={disabledPoints[4]}>
          <Text style={styles.points_text}>{turnEndPoints[4]}</Text>
          <Icon name="numeric-5-box-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={(e) => SelectPoints(5)} disabled={disabledPoints[5]}>
          <Text style={styles.points_text}>{turnEndPoints[5]}</Text>
          <Icon name="numeric-6-box-outline" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dice_container: {
    flexDirection: "row",
  },
  points: {
    flexDirection: "row",
  },
  points_text:{
    textAlign: "center",
  },
  title: {
    backgroundColor: "lightblue",
    color: "white",
    width: 200,
    padding: 10,
    textAlign: "center",
  },
});
