import React from 'react';
import { FlatList, View } from 'react-native';

const FlatListTask = ({ data, renderItem, keyExtractor }) => {
    console.log('Renderizado');

    return (
        <FlatList
            style={{ width: '100%' }}
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={{ gap: 5, marginTop: 5 }}
            ListFooterComponent={<View style={{ height: 20 }} />}
        />
    );
};

export default React.memo(FlatListTask, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data;
});