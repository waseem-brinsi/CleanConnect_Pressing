
import TabNavigator from './TabNavigator';
import { createStackNavigator } from '@react-navigation/stack';

import {
    WelcomeScreen ,WelcomeScreen2,WelcomeScreen3,commencer, 
    LoginScreen,SignupScreen, 
    ClothesDetailScreen, 
    ProfileScreen,
    InformationAcount,
    ClothesConfirmationScreen,
    InformationScreen,
    LocalizationScreen,
    InfoPaymentScreen,
    CommandeAnnulee,
    StoreScreen,
    ProductDetailScreen,
    BasketDetails,
    StoreInfoPay,
    Localization_StoreScreen,
    StoreCommand,
    ArticleDetailScreen,
    ArticleScreen,
    BookmarkDetails,
    HistoryDetailScreen,
    EncoursAttendScreen,
    EncoursAttendBoutique,
    TrackingMap,
    TestimonialScreen,
    BienvenueScreen,
    Verification,
    ForgotPassword,
    ChangePassword,
    VerificationChangePassword,
    SupportScreen,
    Thanks,
    ChangePasswordProfile,
    ProfileSetting,
    InformationEntreprise,
    WorkingTime,
    ChangePhoneNumber,
    Partnership,
    Policy,
    PortfeuilScreen} from '../Screen';


const Stack = createStackNavigator();
const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Welcome2" component={WelcomeScreen2} options={{ headerShown: false }} />
            <Stack.Screen name="Welcome3" component={WelcomeScreen3} options={{ headerShown: false }} />
            <Stack.Screen name="Commencer" component={commencer} options={{ headerShown: false }} />
            <Stack.Screen name="BienvenueScreen" component={BienvenueScreen} options={{ headerShown: false }} />

            
        
            <Stack.Screen name="LoginScreen" component={LoginScreen}   options={{ headerShown: false }}/>
            <Stack.Screen name="SignupScreen" component={SignupScreen}  options={{ headerShown: false }} />
            <Stack.Screen name="Verification" component={Verification}  options={{ headerShown: false }} />
            <Stack.Screen name="VerificationChangePassword" component={VerificationChangePassword}  options={{ headerShown: false }} />
            <Stack.Screen name="SupportScreen" component={SupportScreen}  options={{ headerShown: false }} />
            <Stack.Screen name="Thanks" component={Thanks}  options={{ headerShown: false }} />

            
            
            
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}  options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword}  options={{ headerShown: false }} />

            
            
            <Stack.Screen name="ClothesDetail" component={ClothesDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ClothesConfirmationScreen" component={ClothesConfirmationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="InformationScreen" component={InformationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LocalizationScreen" component={LocalizationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="InfoPaymentScreen" component={InfoPaymentScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CommandeAnnulee" component={CommandeAnnulee} options={{ headerShown: false }} />

            
            <Stack.Screen name="StoreScreen" component={StoreScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BasketDetails" component={BasketDetails} options={{ headerShown: false }} />
            <Stack.Screen name="StoreInfoPay" component={StoreInfoPay} options={{ headerShown: false }} />
            <Stack.Screen name="Localization_StoreScreen" component={Localization_StoreScreen} options={{ headerShown: false }} />
            <Stack.Screen name="StoreCommand" component={StoreCommand} options={{ headerShown: false }} />

            
            
            <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ArticleScreen" component={ArticleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BookmarkDetails" component={BookmarkDetails} options={{ headerShown: false }} />


            <Stack.Screen name="TestimonialScreen" component={TestimonialScreen} options={{ headerShown: false }} />




            
            <Stack.Screen name="HistoryDetailScreen" component={HistoryDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EncoursAttendScreen" component={EncoursAttendScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EncoursAttendBoutique" component={EncoursAttendBoutique} options={{ headerShown: false }} />
            <Stack.Screen name="TrackingMap" component={TrackingMap} options={{ headerShown: false }} />

            <Stack.Screen name="Portfeuil" component={PortfeuilScreen} options={{ headerShown: false }} />


            
            
            
            
            <Stack.Screen name="InformationAcount" component={InformationAcount} options={{ headerShown: false }}/>
                       
            <Stack.Screen name="InformationEntreprise" component={InformationEntreprise} options={{ headerShown: false }}/>
            <Stack.Screen name="WorkingTime" component={WorkingTime} options={{ headerShown: false }}/>
            
           
            <Stack.Screen name="ChangePasswordProfile" component={ChangePasswordProfile} options={{ headerShown: false }}/>
            <Stack.Screen name="ProfileSetting" component={ProfileSetting} options={{ headerShown: false }}/>
            <Stack.Screen name="ChangePhoneNumber" component={ChangePhoneNumber} options={{ headerShown: false }}/>
            <Stack.Screen name="Partnership" component={Partnership} options={{ headerShown: false }}/>
            <Stack.Screen name="Policy" component={Policy} options={{ headerShown: false }}/>

            

            


            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={TabNavigator}  options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
export default AppNavigator;
