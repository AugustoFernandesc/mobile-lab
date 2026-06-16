import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { getCurrentRouteName, navigate } from '../../../../routes/navigation.service';
import type { AppStackParamList } from '../../../../routes/navigation.types';
import { useAppShell } from '../../../../shared/context/AppShellContext';
import { useThemeSettings } from '../../../../shared/context/ThemeSettingsContext';

const EXPANDED_MENU_WIDTH = 220;
const COMPACT_MENU_WIDTH = 95;

type MenuRoute = 'Home' | 'Architecture' | 'Settings';

type MenuPalette = {
  background: string;
  card: string;
  border: string;
  text: string;
  logo: number;
};

const menuItems: Array<{
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: MenuRoute;
}> = [
  {
    title: 'Arquitetura',
    icon: 'account-tree',
    route: 'Architecture',
  },
  {
    title: 'Configurações',
    icon: 'settings',
    route: 'Settings',
  },
];

export function AppSideMenu() {
  const { isMenuOpen, closeMenu } = useAppShell();
  const { appTheme, isCompactMenu, sideMenuTheme } = useThemeSettings();
  const [currentRouteName, setCurrentRouteName] = useState<MenuRoute>('Home');
  const menuWidth = isCompactMenu ? COMPACT_MENU_WIDTH : EXPANDED_MENU_WIDTH;
  const translateX = useRef(new Animated.Value(-EXPANDED_MENU_WIDTH)).current;

  const menuPalette: MenuPalette =
    sideMenuTheme === 'dark'
      ? {
          background: '#0B1220',
          card: 'rgba(255,255,255,0.08)',
          border: 'rgba(255,255,255,0.12)',
          text: '#FFFFFF',
          logo: require('../../../../assets/mgCodeLogoLargeSidenavDark.png'),
        }
      : {
          background: '#FFFFFF',
          card: '#F3F6FA',
          border: '#D7E0EA',
          text: appTheme.colors.text,
          logo: require('../../../../assets/mgCodeLogoLargeSidenavLight.png'),
        };

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isMenuOpen ? 0 : -menuWidth,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [isMenuOpen, menuWidth, translateX]);

  useEffect(() => {
    const routeName = getCurrentRouteName() as keyof AppStackParamList | null;

    if (routeName === 'Architecture' || routeName === 'Settings' || routeName === 'Home') {
      setCurrentRouteName(routeName);
      return;
    }

    setCurrentRouteName('Home');
  }, [isMenuOpen]);

  function handleNavigate(route: MenuRoute) {
    setCurrentRouteName(route);
    closeMenu();
    setTimeout(() => navigate(route), 180);
  }

  return (
    <Modal transparent visible={isMenuOpen} animationType="none" onRequestClose={closeMenu}>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: appTheme.colors.overlay }}>
        <Animated.View
          style={{
            width: menuWidth,
            backgroundColor: menuPalette.background,
            transform: [{ translateX }],
            paddingTop: 54,
            paddingHorizontal: isCompactMenu ? appTheme.spacing.sm : appTheme.spacing.lg,
            overflow: 'hidden',
          }}
        >
          <Pressable onPress={() => handleNavigate('Home')}>
            <Image
              source={menuPalette.logo}
              resizeMode="contain"
              style={{
                width: isCompactMenu ? 58 : 180,
                height: 70,
                marginBottom: appTheme.spacing.xl,
                alignSelf: isCompactMenu ? 'center' : 'flex-start',
              }}
            />
          </Pressable>

          <ScrollView contentContainerStyle={{ gap: appTheme.spacing.md }}>
            {menuItems.map((item) => {
              const isActive = currentRouteName === item.route;

              return (
                <Pressable
                  key={item.title}
                  onPress={() => handleNavigate(item.route)}
                  style={{
                    backgroundColor: isActive ? appTheme.colors.primary : menuPalette.card,
                    borderRadius: appTheme.radius.md,
                    padding: appTheme.spacing.md,
                    borderWidth: 1,
                    borderColor: isActive ? appTheme.colors.primaryDark : menuPalette.border,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: isCompactMenu ? 'center' : 'flex-start',
                    gap: 12,
                    minHeight: 64,
                  }}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={24}
                    color={isActive ? '#FFFFFF' : menuPalette.text}
                  />
                  {!isCompactMenu ? (
                    <Text
                      style={{
                        color: isActive ? '#FFFFFF' : menuPalette.text,
                        fontSize: 16,
                        fontWeight: '700',
                      }}
                    >
                      {item.title}
                    </Text>
                  ) : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </Animated.View>

        <Pressable onPress={closeMenu} style={{ flex: 1 }} />
      </View>
    </Modal>
  );
}
