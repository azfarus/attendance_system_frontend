#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9
 
MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class

MFRC522::MIFARE_Key key; 

// Init array that will store new NUID 
//byte nuidPICC[3];
unsigned long ID;  // convert 3 byte to ulong

void setup() { 

    pinMode(LED_BUILTIN , HIGH);
  Serial.begin(115200);
  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522 
  // definiere KEY (default) FF FF FF FF FF FF 
  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }

}

void loop() {

  // Look for new cards
  if ( ! rfid.PICC_IsNewCardPresent())
    return;

  // Verify if the NUID has been readed
  if ( ! rfid.PICC_ReadCardSerial())
    return;

    // dump_byte_array(rfid.uid.uidByte, 4);
  
  // Read sector 1 block 4 
    byte trailerBlock   = 7;
    byte sector         = 1;
    byte blockAddr      = 4;
    
    MFRC522::StatusCode status;
    byte buffer[18];
    byte size = sizeof(buffer);

// Authenticate 
    status = (MFRC522::StatusCode) rfid.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, trailerBlock, &key, &(rfid.uid));
    if (status != MFRC522::STATUS_OK) {
        // Serial.print(F("PCD_Authenticate() failed: "));
        // Serial.println(rfid.GetStatusCodeName(status));
        return;
    }
    

// Read data from the block 
    status = (MFRC522::StatusCode) rfid.MIFARE_Read(blockAddr, buffer, &size);
    if (status != MFRC522::STATUS_OK) {
        // Serial.print(F("MIFARE_Read() failed: "));
        // Serial.println(rfid.GetStatusCodeName(status));
    }
    
    dump_byte_array(buffer, 16,11,15);
    for(int i = 0 ; i < 10 ; i++){
        digitalWrite(LED_BUILTIN , !digitalRead(LED_BUILTIN));
        delayMicroseconds(100000);
    }
    Serial.println();
    //  Serial.print (buffer[0]);
    //  Serial.print (":");
    //  Serial.println (buffer[1]);
     
    
    
    //Serial.println ("done");
    // Halt PICC
    rfid.PICC_HaltA();
    // Stop encryption on PCD
    rfid.PCD_StopCrypto1();
}



void dump_byte_array(byte *buffer, byte bufferSize , byte start , byte end) {
    
    for (byte i = start; i <= end; i++) {
        buffer[i] = (buffer[i]>=0xA0?buffer[i]&0x0F:buffer[i]);
        Serial.print(buffer[i] < 0x10 ? "0" : "");
        Serial.print(buffer[i], HEX);
    }
}