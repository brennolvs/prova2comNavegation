import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather,Entypo, FontAwesome } from '@expo/vector-icons'

import Home from '../screen/Home';
import Procurar from '../screen/Procurar';
import Detalhes from '../screen/Detalhes';
import Lista from '../screen/Lista';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator >

            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: () => < Entypo name='home'/>
                }}/>

            <Tab.Screen
                name='Procurar'
                component={Procurar} 
                options={{
                    tabBarIcon: () => < FontAwesome name='search'/>
                }}/>

            <Tab.Screen
                name='Detalhes'
                component={Detalhes}
                options={{
                    tabBarIcon: () => < Entypo name='clipboard'/>
                }} />

            <Tab.Screen
                name='Lista'
                component={Lista} 
                options={{
                    tabBarIcon: () => < FontAwesome name='list-ul'/>
                }}/>

        </Tab.Navigator>

    )
}